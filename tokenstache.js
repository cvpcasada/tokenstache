const REG_EXP = /({{.*?}})/g;

function put(val, arr = []) {
  if (val !== undefined && val !== null) {
    arr.push(val);
  }
}

/** Tokenizes a string that contains handlebars and tries to resolve it
 *  @name tokenize
 *  @param {String} template - The template containing one or more {{variableNames}} every variable
 *  @param {Object | Function} [view={}] - An object or function that will resolve the values
 *    for every variable names that is used in the template. If it's omitted, it'll be set to
 *    an empty object essentially removing all {{varName}}s in the template.
 *  @returns {Array} - Template where its variable names replaced with corresponding values.
 *  @example
 *    let arr = tokenize(`hello {{user}}`, {user: `jim`});  // outputs: ['hello', jim]
 */
export function tokenize(template, view = {}) {
  let arr = [];
  let tokens = template.split(REG_EXP);
  for (let i = 0; i < tokens.length; i++) {
    let match = tokens[i];

    if (/^{/.test(match)) {
      match = match.substring(2, match.length - 2);
      if (view instanceof Function) {
        put(view(match, arr.length), arr);
      } else if (view instanceof Object) {
        const res = view[match];
        if (res instanceof Function) {
          put(res(match, arr.length), arr);
        } else {
          put(res, arr);
        }
      }
    } else {
      if (`` !== match) arr.push(match);
    }
  }
  return arr;
}
