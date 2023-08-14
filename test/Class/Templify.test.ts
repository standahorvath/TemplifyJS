import {describe, expect, test} from '@jest/globals'
import {Templify} from '../../src/Class/Templify'

describe('Templify', () => {
    let templify;

    beforeEach(() => {
        templify = new Templify('Hello, {{ name }}!');
    });

    it('should render simple variable', () => {
        const data = { name: 'Alice' };
        const result = templify.render(data);
        expect(result).toBe('Hello, Alice!');
    });

    it('should render variable with custom pipe', () => {
        templify.addPipe('reverse', (value) => value.split('').reverse().join(''));
        const data = { name: 'Alice' };
        const result = templify.render(data, 'Name reversed: {{ name | reverse }}');
        expect(result).toBe('Name reversed: ecilA');
    });

    it('should render foreach loop', () => {
        const data = { items: ['Apple', 'Banana', 'Cherry'] };
        const template = `Fruits: {% foreach:items %}{{ item }} {% endforeach %}`;
        const result = templify.render(data, template);
        expect(result).toBe(`Fruits: Apple Banana Cherry `);
    });

	it('should render foreach loop with index', () => {
		const data = { items: ['Apple', 'Banana', 'Cherry'] };
		const template = `Fruits: {% foreach:items %}{{ index }}: {{ item }} {% endforeach %}`;
		const result = templify.render(data, template);
		expect(result).toBe(`Fruits: 0: Apple 1: Banana 2: Cherry `);
	});
	

    it('should render if statement', () => {
        const data = { isAdmin: true };
        const template = `{% if:isAdmin %}You have admin privileges.{% else %}You do not have admin privileges.{% endif %}`;
        const result = templify.render(data, template);
        expect(result).toBe('You have admin privileges.');
    });

	it('should render nested if statement', () => {
		const data = { isAdmin: true, isSuperAdmin: true };
		const template = `{% if:isAdmin %}You Are Admin {% if:isSuperAdmin %}and Superadmin too.{% endif %}{% else %}You do not have admin privileges.{% endif %}`;
		const result = templify.render(data, template);
		expect(result).toBe('You Are Admin and Superadmin too.');
	});

	it('should gracefully render undefined variable in if statement', () => {
		const data = { isAdministrator: true };
		const template = `Test{% if:isAdmin %}You have admin privileges.{% else %}You do not have admin privileges.{% endif %}`;
		const result = templify.render(data, template);
		expect(result).toBe('Test');
	});

    it('should handle missing variable gracefully', () => {
        const data = {};
        const result = templify.render(data);
        expect(result).toBe('Hello, !');
    });

    it('should handle unknown pipe gracefully', () => {
        const data = { name: 'Alice' };
        const result = templify.render(data, 'Name: {{ name | unknownPipe }}');
        expect(result).toBe('Name: Alice');
    });

    it('should handle error in custom pipe gracefully', () => {
        templify.addPipe('errorPipe', () => {
            throw new Error('Custom pipe error');
        });
        const data = { value: 'data' };
        const result = templify.render(data, '{{ value | errorPipe }}');
        expect(result).toBe('data');
    });
});