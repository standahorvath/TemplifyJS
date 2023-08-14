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
        output = output.replace(/{{\s*([\w.-]+)\s*}}/g, (match, variable) => {
            const value = this.getPropertyValue(data, variable);
            return value !== undefined ? value : match;
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

        // Replace if statements, recursive
        output = this.renderNestedIfElse(output, data);

        // Clear unused variables
        output = output.replace(/{{\s*([\w.-]+)\s*}}/g, '');

        return output;
    }

    private renderNestedIfElse(input: string, data: any) {
        let output = '';
        let currentIndex = 0;
    
        while (currentIndex < input.length) {
            const ifStart = input.indexOf('{%', currentIndex);
            if (ifStart === -1) {
                output += input.slice(currentIndex);
                break;
            }
    
            output += input.slice(currentIndex, ifStart);
    
            const ifEnd = input.indexOf('%}', ifStart);
            if (ifEnd === -1) {
                // Handle error: unterminated if block
                break;
            }
    
            const ifBlock = input.slice(ifStart, ifEnd + 2);
            const conditionMatch = ifBlock.match(/{%\s*if:([\w.-]+)\s*%}/);
            if (!conditionMatch) {
                // Handle error: invalid if block
                break;
            }
    
            const condition = conditionMatch[1];
            const value = this.getPropertyValue(data, condition);
            const contentStart = ifEnd + 2;
            let contentEnd, elseStart, elseContent;
    
            if (value) {
                contentEnd = input.indexOf('{%', contentStart);
                elseStart = input.indexOf('{% else %}', contentStart);
            } else {
                elseStart = input.indexOf('{% else %}', contentStart);
                contentEnd = elseStart !== -1 ? elseStart : input.indexOf('{%', contentStart);
            }
    
            if (elseStart !== -1 && elseStart < contentEnd) {
                elseContent = input.slice(elseStart + 10, contentEnd);
            }
    
            const content = input.slice(contentStart, contentEnd);
    
            if (value) {
                output += this.renderNestedIfElse(content, data);
            } else if (elseContent) {
                output += this.renderNestedIfElse(elseContent, data);
            }
    
            currentIndex = contentEnd;
        }
    
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