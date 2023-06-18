# TemplifyJS
A simple template language engine for Typescript

```shell
npm i templify-js
```

## Language

### Simple variable print
`{{variable}}` Prints variable

**Example:**
```html
<h1>My name is {{name}}</h1>
```
**Data:**
```json
{ "name": "Standa" }
```

**Output:**
```
My name is Standa
```