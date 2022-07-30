const a = 1;
const aObject = {
    value:1
}


function changeValue(a){
    a.value = 3;
    return a.value;
}


console.log(changeValue(aObject));
console.log(`object :${aObject.value}`);