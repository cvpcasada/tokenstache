# tokenstache

> A tiny tokenizer for handlebars variables

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Examples](#examples)
- [API](#api)
- [License](#license)

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

```sh
npm install --save tokenstache
```

Then with a module bundler like [webpack](https://webpack.js.org) or [rollup](http://rollupjs.org), use as you would anything else:

```js
import { tokenize } from 'tokenstache'
```

The [UMD](https://github.com/umdjs/umd) build is also available on [unpkg](https://unpkg.com):

```html
<script src="//unpkg.com/tokenstache/dist/tokenstache.umd.js"></script>
```

You can find the library on `window.tokenstache`.

### Usage

```js
import { tokenize } from 'tokenstache'
let arr = tokenize(`hello {{user}}`, {user: `jim`});  // outputs: [`hello `, `jim`]
```

### API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

##### Table of Contents

- [tokenize](#tokenize)

#### tokenize

Tokenizes a string that contains handlebars and tries to resolve it

**Parameters**

- `template` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The template containing one or more {{variableNames}} every variable
- `view` **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function))** An object or function that will resolve the values
       for every variable names that is used in the template. If it's omitted, it'll be set to
       an empty object essentially removing all {{varName}}s in the template. (optional, default `{}`)

**Examples**

```javascript
let arr = tokenize(`hello {{user}}`, {user: `jim`});  // outputs: [`hello `, `jim`]
```

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Template where its variable names replaced with corresponding values.

### Reporting Issues

Found a problem? Want a new feature? First of all see if your issue or idea has [already been reported](../../issues).
If don't, just open a [new clear and descriptive issue](../../issues/new).

### License

[MIT License](LICENSE.md) © [Cyrus Venn Casada](https://github.com/cvpcasada)
