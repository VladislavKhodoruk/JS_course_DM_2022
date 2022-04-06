function add(a, b) {
  if (!b) {
    return add.bind(this, a);
  }
  return a + b;
}
function sub(a, b) {
  if (!b) {
    return sub.bind(this, a);
  }
  return a - b;
}
function mul(a, b) {
  if (!b) {
    return mul.bind(this, a);
  }
  return a * b;
}
function div(a, b) {
  if (!b) {
    return div.bind(this, a);
  }
  return a / b;
}

// function pipe(){
//     let operations = [];
//     for(let i = 0; i < arguments.length; i++){
//         operations[i] = arguments[i];
//     }
//     return function(number){
//         let result = number;
//         for(let i = 0; i < operations.length; i++){
//             result = operations[i](result);
//         }
//         return result;
//     }
// }
