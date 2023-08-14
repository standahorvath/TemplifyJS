export class Templify {
    private template: string;
    private pipes: { [key: string]: (value: any, arg?: string) => any } = {};

    constructor(template: string) {
        this.template = template;
    }

    public addPipe(name: string, callback: (value: any, arg?: string) => any): void {
        this.pipes[name] = callback;
    }

    public render(data: any, template = this.template): string {
        let output = template;

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

        // Replace foreach loops
        output = output.replace(
            /{%\s*foreach:([\w.-]+)\s*%}(.*?)\{%\s*endforeach\s*%}/gs,
            (match, variable, content) => {
                const list = this.getPropertyValue(data, variable);
                if (Array.isArray(list)) {
                    return list.map((item, index) => this.render({ ...data, item, index }, content)).join('');
                }
                return match;
            }
        );

        // Replace if statements
        const ifElsePattern = /{%\s*if:([\w.-]+)\s*%}(?:(?!{%\s*(?:if:[\w.-]+|endif)\s*%}).)*(?:{%\s*else\s*%}(?:(?!{%\s*(?:if:[\w.-]+|endif)\s*%}).)*)?{%\s*endif\s*%}/gs
        while (ifElsePattern.exec(output) !== null) {
            output = output.replace(
                ifElsePattern,
                (match) => {
                    return match.replace(
                        /{%\s*if:([\w.-]+)\s*%}(.*?)({%\s*else\s*%}(.*?))?{%\s*endif\s*%}/gs,
                        (match, condition, ifContent, elseStatement, elseContent) => {
                            const value = this.getPropertyValue(data, condition);
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