# TemplifyJS
A simple template language engine for Typescript

```shell
npm i templify-js
```

## Using
Simple import Templify class and create new instance with template string. Then call render method with data object. That's all.

```typescript
import { Templify } from 'templify-js';

const template = `
	<h1>{{ title }}</h1>
	<ul>
		{% foreach:skills %}
			<li>{{ item }}</li>
		{% endforeach %}
	</ul>
`;

const data = {
	title: 'My skills',
	skills: ['HTML', 'CSS', 'JS']
};

const templify = new Templify(template);

const output = templify.render(data);
```

## Language

### Simple variable print
`{{ variable }}` Prints variable

**Example:**
```html
<h1>My name is {{ name }}</h1>
```
**Data:**
```json
{ "name": "Standa" }
```

**Output:**
```
My name is Standa
```
### Variable with pipe
`{{ variable|pipe }}` Prints modified variable

**Example:**
```html
<div>How big is {{ animal|upper }}</div>
```
**Data:**
```json
{ "animal": "Elephant" }
```

**Output:**
```
How big is ELEPHANT
```

### Simple foreach
`{% foreach:variable %}` Foreach your variable
`{% endforeach %}` End foreach

**Example:**
```html
<ul>
	{% foreach:skills %}
		<li>{{ item }}</li>
	{% endforeach %}
</ul>
```

**Data:**
```json
{ "skills": ["HTML", "CSS", "JS"] }
```

**Output:**
```html
<ul>
	<li>HTML</li>
	<li>CSS</li>
	<li>JS</li>
</ul>
```

### Foreach with object array
`{% foreach:variable %}` Foreach your variable
`{% endforeach %}` End foreach

**Example:**
```html
<ul>
	{% foreach:skills %}
		<li>{{ item.name }} - {{ item.level }}</li>
	{% endforeach %}
</ul>
```

**Data:**
```json
{ "skills": [
	{ "name": "HTML", "level": "advanced" },
	{ "name": "CSS", "level": "advanced" },
	{ "name": "JS", "level": "beginner" }
] }
```

**Output:**
```html
<ul>
	<li>HTML - advanced</li>
	<li>CSS - advanced</li>
	<li>JS - beginner</li>
</ul>
```

### Conditional statement
`{% if:variable %}` If your variable is true
`{% else %}` Else statement
`{% endif %}` End if statement

**Example:**
```html
{% if:isAdult %}
	<p>You are adult</p>
{% else %}
	<p>You are not adult</p>
{% endif %}
```

**Data:**
```json
{ "isAdult": true }
```

**Output:**
```html
<p>You are adult</p>
```
