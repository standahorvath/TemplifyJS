import { Templify } from './Class/Templify';

const bootstrap = () => {

	const template = `Fruits: {% foreach:items %} {% foreach:item %}Fruit:{{ item }} {% endforeach %}{% endforeach %}`

	const data = { items: [['Apple', 'Banana'], ['Cherry', 'Date']] };

	const templify = new Templify(template);
	templify.addPipe('lower', (value: string) => value.toLowerCase())

	const output = templify.render(data);
	console.log(output);
}

bootstrap()