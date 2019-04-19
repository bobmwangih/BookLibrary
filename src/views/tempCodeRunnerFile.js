var arr=[1,2,3,4];
var arr2=[1,3,4,7];
arr.forEach(element => {
    if(!(arr2.includes(element))){
        console.log(element);
    }
});