/**
 * Created by w on 2017/12/16.
 */
let arr = [1,2,2,3,4,5,3,4,5];
//
// arr = [...new Set(arr)];
//

Array.prototype.removeRepeat = function (arr) {
    arr = [...new Set(arr)];

    return arr;
};

arr = arr.removeRepeat(arr);

arr.forEach(v=>{
    console.log(v);
});



