import { Templify } from './Class/Templify';

const bootstrap = () => {

	const template = `
	<h1>{{ title|lower }}</h1>
	<ul>
		{% foreach:skills %}
			<li>{{ item }}</li>
		{% endforeach %}
	</ul>
`

	const data = {
		title: 'My skills',
		skills: ['HTML', 'CSS', 'JS']
	};

	const templify = new Templify(template);
	templify.addPipe('lower', (value: string) => value.toLowerCase())

	const output = templify.render(data);
	console.log(output);
}

bootstrap()