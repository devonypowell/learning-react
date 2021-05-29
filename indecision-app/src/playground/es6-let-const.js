var nameVar = 'Devony';
var nameVar = 'Mike';

console.log('nameVar', nameVar);

let nameLet = 'Powell';
console.log('nameLet', nameLet);

// var variable are only function scoped and not block scrope in JavaScript, meaning that if you 
// define a var variable inside of a function, you will not be able to access it
// however, if you create a var variable inside of a if or for loop, you can access it
// let and const on the other hand are block scoped, meaning that the variable is only local
// to that block of code, or within the if, for, while loop. 
// var variable only works for function block as how would expect block code to work

var fullName = 'Devony Powell';

if(fullName) {
    var firstName = fullName.split(' ')[0];
}

console.log(firstName);