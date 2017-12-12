const REG_EXP = /\{\{\s*(.*?)\s*\}\}|(\S+)/g;

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
  let match,
    arr = [];
    
  while ((match = REG_EXP.exec(template)) !== null) {
    if (match[1]) {
      // ugggh, we want pattern matching here lol
      if (view instanceof Function) {
        put(view(match[1], arr.length), arr);
      } else if (view instanceof Object) {
        const res = view[match[1]];
        if (res instanceof Function) {
          put(res(match[1], arr.length), arr);
        } else {
          put(res, arr);
        }
      }
    } else if (match[2]) {
      put(match[2], arr);
    }
  }

  return arr;
}