export class Templify {
    template: string | null

    constructor(template: string | null) {
        this.template = template
    }
    public getTemplate(): string | null {
        return this.template
    }
    public setTemplate(template: string | null): void {
        this.template = template
    }
    public render(data: any): string {
        if (this.template === null) {
            return ''
        }
        let template = this.template
        for (let key in data) {
            template = template.replace(`{{${key}}}`, data[key])
        }
        return template
    }
}