const arr_in = [-2,1,-3,4,-1,2,1,-5,4];
let res = {maxSum: 0,
            first_pos: 0,
            last_pos: 0};
function getIndexSum(arr, res){
    for(let i = 0, sum = 0; i < arr.length; i++, sum = 0){
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
console.log("подмассив: ", arr_in.slice(res.first_pos, res.last_pos + 1), "\nсумма: ", res.maxSum);