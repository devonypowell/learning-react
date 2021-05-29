// there are a couple of ways to create functions in javascript

// this function is known as anonymous function - ES5 function
const square = function(x) {
    return x * x;
}

console.log(square(3));

// we can also create javascript function like the one below - ES5 function
function squareArrow(x) {
    return x * x;
}

console.log(squareArrow(5));

// we the new ES6 function, we can create function like this
const squareTwoNumbers = (x) => {
    return x * x;
}

console.log(squareTwoNumbers(7));

// shorthand syntax of the arrow function if you're just return one line
const squareANumber = (x) => x * x;

console.log(squareANumber(10));


// Challenge
const getFirstName = (fullName) => fullName.split(' ')[0];
console.log(getFirstName('Mike Smith'));
