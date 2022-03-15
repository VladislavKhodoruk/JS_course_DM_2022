const arr1 = [7,1,5,3,6,4];
const arr2 = [1,2,3,4,5];
let sum = 0;
function broker(arr, sum){
    for(let i = 0; i < arr.length-1; i++){
        if(arr[i] < arr[i+1]) //условие успешной сделки
            sum += arr[i+1] - arr[i];
    }
    return sum;
}
console.log(broker(arr1, sum), broker(arr2, sum));