function add(a, b = undefined) {
  if (b === undefined) {
    return add.bind(this, a);
  }
  return a + b;
}
function sub(a, b = null) {
  if (b === undefined) {
    return sub.bind(this, a);
  }
  return a - b;
}
function mul(a, b = null) {
  if (b === undefined) {
    return mul.bind(this, a);
  }
  return a * b;
}
function div(a, b = null) {
  if (b === undefined) {
    return div.bind(this, a);
  }
  return a / b;
}

//не разобрался до конца как сделать pipe
// function pipe(){
//     number = arguments[0];
//     for(let i = 1; i < arguments.length; i++){
//         number = arguments[i](number);
//     }
//     return result;
// }
