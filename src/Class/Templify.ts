export class Templify {
    private template: string;
    private pipes: { [key: string]: (value: any) => any } = {};

    constructor(template: string) {
        this.template = template;
    }

    public addPipe(name: string, callback: (value: any) => any): void {
        this.pipes[name] = callback;
    }

    public render(data: any, template = this.template): string {
        let output = template;

        // Replace simple variable print
        output = output.replace(/{{\s*([\w.]+)\s*}}/g, (match, variable) => {
            const value = this.getPropertyValue(data, variable);
            return value !== undefined ? value : match;
        });

        // Replace variable with pipe
        output = output.replace(/{{\s*([\w.]+)\s*\|\s*([\w.]+)\s*}}/g, (match, variable, pipe) => {
            const value = this.getPropertyValue(data, variable);
            return value !== undefined ? this.applyPipe(value, pipe) : match;
        });

        // Replace foreach loops
        output = output.replace(
            /{%\s*foreach:([\w.]+)\s*%}(.*?)\{%\s*endforeach\s*%}/gs,
            (match, variable, content) => {
                const list = this.getPropertyValue(data, variable);
                if (Array.isArray(list)) {
                    return list.map(item => this.render({ ...data, item }, content)).join('');
                }
                return match;
            }
        );

        // Replace if statements
        output = output.replace(
            /{%\s*if:([\w.]+)\s*%}(.*?)({%\s*else\s*%}(.*?))?{%\s*endif\s*%}/gs,
            (match, condition, ifContent, elseStatement, elseContent) => {
                const value = this.getPropertyValue(data, condition);
                if (value) {
                    return this.render(data, ifContent);
                }
                return elseContent ? this.render(data, elseContent) : '';
            }
        );

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

    private applyPipe(value: any, pipe: string): any {
        // Custom pipes
        if (Object.keys(this.pipes).indexOf(pipe) !== -1 && typeof this.pipes[pipe] === 'function') {
            try {
                return this.pipes[pipe](value);
            } catch (e) {
                console.log("Error in pipe: " + pipe)
                console.error(e)
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