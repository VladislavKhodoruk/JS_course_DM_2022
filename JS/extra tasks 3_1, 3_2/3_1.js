const arr_in = [-2,1,-3,4,-1,2,1,-5,4];
let res = {maxSum: arr_in[0],
          first_pos: 0,
          last_pos: 0};
let sum = 0;
function getIndexSum(arr, res){
    for(let i = 0; i < arr.length; i++){
        sum = 0;
        for(let j = i; j < arr.length; j++){
            sum += arr[j];
            if(sum > res.maxSum){//если получили бОльшую сумму, чем в сохранённом объекте, перезаписываем
                res.maxSum = sum;
                    res.first_pos = i;
                    res.last_pos = j;
            }
        }
    }
    return res;
}
getIndexSum(arr_in, res);
console.log("подмассив 1: ", arr_in.slice(res.first_pos, res.last_pos + 1), "\nсумма 1: ", res.maxSum)
const arr_in2 = [-1];
let res2 = {maxSum: arr_in2[0],
          first_pos: 0,
          last_pos: 0};
getIndexSum(arr_in2, res2);
console.log("подмассив 2: ", arr_in2.slice(res2.first_pos, res2.last_pos + 1), "\nсумма 1: ", res2.maxSum);
const arr_in3 = [-3, -3, -9, -4, -2, -8, -7];
let res3 = {maxSum: arr_in3[0],
          first_pos: 0,
          last_pos: 0};
getIndexSum(arr_in3, res3);
console.log("подмассив 3: ", arr_in3.slice(res3.first_pos, res3.last_pos + 1), "\nсумма 3: ", res3.maxSum);