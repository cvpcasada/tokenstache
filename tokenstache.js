const REG_EXP = /\{\{\s*(.*?)\s*\}\}|(\S+)/g;

function put(val, arr = []) {
  if (val !== undefined && val !== null) {
    arr.push(val);
  }
}

/** Tokenizes a string that contains handlebars and tries to resolve it
 *  @name tokenize
 *  @param {String} `String`		        The string we wanted to tokenize
 *  @param {Object | Function} [`view`] Optional, Resolves the handlebars in the string. Will strip the corresponding handlebars if unresolved		
 *  @returns {Array} `arr`              Results
 *  @example
 *    let arr = tokenize(`hello {{user}}`, {user: `jim`});  // outputs: ['hello', jim]
 */
export function tokenize(string, view = {}) {
  let match,
    arr = [];
    
  while ((match = REG_EXP.exec(string)) !== null) {
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