export class Templify {
    private template: string;
    private pipes: { [key: string]: (value: any, arg?: string) => any } = {};

    constructor(template: string) {
        this.template = template;
    }

    public addPipe(name: string, callback: (value: any, arg?: string) => any): void {
        this.pipes[name] = callback;
    }

    public simplify(template = this.template): string {
        return template
        .replace(/\s}}/g, '}}')
        .replace(/{{\s/g, '{{')
        .replace(/\s%}/g, '%}')
        .replace(/{%\s/g, '{%')
        .replace(/{%foreach:\s/g, '{%foreach:')

    }

    public render(data: any, template = this.template): string {

        let output = this.simplify(template);

        // Replace foreach loops deeply
        while (output.indexOf('{%foreach:') !== -1) {
            // Lets start with first foreach
            const startForeach = output.indexOf('{%foreach:');
            // Find the end of the foreach
            let pointerPosition = startForeach + 10;
            while(output.indexOf('{%foreach:', pointerPosition) < output.indexOf('{%endforeach%}', pointerPosition) && output.indexOf('{%foreach:', pointerPosition) !== -1) {
                pointerPosition = output.indexOf('{%endforeach%}', pointerPosition) + 14;
            }
            const endForeach = output.indexOf('{%endforeach%}', pointerPosition);

            // Get the foreach content
            const content = output.substring(startForeach, endForeach + 14);
            let subcontent = content.substring(content.indexOf('%}') + 2, content.lastIndexOf('{%'));
            const variable = content.substring(content.indexOf(':') + 1, content.indexOf('%}')).replace(/\s/g, '')
            const subdata = this.getPropertyValue(data, variable);
            
            if(subcontent.indexOf('{%foreach:') === -1) {
                const foreachContent = content.replace(
                    /{%\s*foreach:([\w.-]+)\s*%}(.*?)\{%\s*endforeach\s*%}/gs,
                    (match, variable, matchcontent) => {
                        const list = this.getPropertyValue({...data, item:subdata}, variable);
                        if (Array.isArray(list)) {
                            return list.map((item, index) => {  return this.render({ ...subdata, index, ...data, item}, subcontent)}).join('');
                        } else {
                            return this.render({ ...subdata }, matchcontent);
                        }
                    }
                );
                output = output.replace(content, this.render({...data, item:subdata}, foreachContent))
            } else {
                if(Array.isArray(subdata)){
                    output = output.replace(content, subdata.map((item, index) => this.render({ index, ...data, item }, subcontent)).join(''))
                } else {
                    output = output.replace(content, this.render({...data, item:subdata }, subcontent))
                }
            }
            
        }

        // Replace simple variable print
        output = output.replace(/{{\s*([\w.-]+)\s*}}/g, (match, variable) => {
            const value = this.getPropertyValue(data, variable);
            return value !== undefined ? value : match;
        });

        // Replace variable with pipe and arguments
        output = output.replace(/{{\s*([\w.-]+)\s*\|\s*([\w.-]+)\s*:\s*([\w.-]+)\s*}}/g, (match, variable, pipe, args) => {
            const value = this.getPropertyValue(data, variable);
            return value !== undefined ? this.applyPipe(value, pipe, args) : match;
        });

        // Replace variable with pipe
        output = output.replace(/{{\s*([\w.-]+)\s*\|\s*([\w.-]+)\s*}}/g, (match, variable, pipe) => {
            const value = this.getPropertyValue(data, variable);
            return value !== undefined ? this.applyPipe(value, pipe) : match;
        });

        // Replace if statements
        const ifElsePattern = /{%\s*if:([\w.\-=\s]+)\s*%}(?:(?!{%\s*(?:if:[\w.\-=\s]+|endif)\s*%}).)*(?:{%\s*else\s*%}(?:(?!{%\s*(?:if:[\w.\-=\s]+|endif)\s*%}).)*)?{%\s*endif\s*%}/gs
        while (ifElsePattern.exec(output) !== null) {
            output = output.replace(
                ifElsePattern,
                (match) => {
                    return match.replace(
                        /{%\s*if:([\w.\-=\s]+)\s*%}(.*?)({%\s*else\s*%}(.*?))?{%\s*endif\s*%}/gs,
                        (match, condition, ifContent, elseStatement, elseContent) => {

                            const conditions = condition.split('==').map((item:string) => item.trim());
                            let value = null
                            if(conditions.length === 2) {
                                value = String(this.getPropertyValue(data, conditions[0])) === String(conditions[1])
                            } else {
                                value = this.getPropertyValue(data, condition);
                            }

                            if (value) {
                                return this.render(data, ifContent);
                            } else if (elseContent) {
                                return this.render(data, elseContent);
                            }
                            return '';
                        })
                }
            );
        };

        // Clear unused variables
        output = output.replace(/{{\s*([\w.-]+)\s*}}/g, '');

        return output;
    }

    private getPropertyValue(obj: any, path: string): any {
        const properties = path.split('.');
        let value = obj;
        for (const property of properties) {
            if (typeof value !== 'object' || value === null || !(property in value)) {
                return undefined;
            }
            value = value[property];
        }
        return value;
    }

    private applyPipe(value: any, pipe: string, arg?: string): any {
        // Custom pipes
        if (Object.keys(this.pipes).indexOf(pipe) !== -1 && typeof this.pipes[pipe] === 'function') {
            try {
                return this.pipes[pipe](value, arg);
            } catch (e) {
                console.log("Error in pipe: " + pipe)
            }
        }
        // Default pipes
        switch (pipe) {
            case 'upper':
                return String(value).toUpperCase();
            default:
                return value;
        }
    }
}