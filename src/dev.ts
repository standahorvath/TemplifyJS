import { Templify } from './Class/Templify';

const bootstrap = () => {

	const template = `{% if:is-admin %}You have admin privileges.{% endif %}`;
    console.log(template)
	const data = { 'is-admin': true };
    console.log(data)
	const templify = new Templify(template);
	templify.addPipe('lower', (value: string) => value.toLowerCase())

	const output = templify.render(data);
    console.log("output:")
	console.log(output);
}

bootstrap()