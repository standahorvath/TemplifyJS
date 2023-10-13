import { Templify } from './Class/Templify';

const bootstrap = () => {

	const template = '{% foreach: items %}{% foreach: item %}{{ item }}{% endforeach %}{% endforeach %}';
    console.log(template)
	const data = { items: [['A', 'B'], ['1', '2']] };
    console.log(data)
	const templify = new Templify(template);
	templify.addPipe('lower', (value: string) => value.toLowerCase())

	const output = templify.render(data);
    console.log("output:")
	console.log(output);
}

bootstrap()