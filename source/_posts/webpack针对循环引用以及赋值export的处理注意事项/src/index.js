import a from './a'

/* 对应result/export function.js */
// export function _console() {
//   console.log('this is index.js')
// }
/* --- */

/* 对应result/export const _var.js */
// export const _console = function () {
//   console.log('this is index.js')
// }
/* --- */

/* 对应result/export {_var}.js */
function _console() {
  console.log('this is index.js')
}

export { _console }
/* --- */