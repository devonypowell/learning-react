// this keyword is bound to a anonymous function(), meaning that if you use the 
// this keyword within an object that has a function, you can use the this keyword
// to access properties of that object

// const user = {
//     name: 'Devony',
//     cities: ['Plano', 'Arlington', 'Fort Worth'],
//     printPlacesLived: function() {
//         console.log(this.name);
//         this.cities.forEach((city) => {
//             console.log(`${this.name} has lived in ${city}`);
//         });
//     }
// }



// new ES6 syntax for function in an object. You can remove the function keyword
const user = {
    name: 'Devony',
    cities: ['Plano', 'Arlington', 'Fort Worth'],
    printPlacesLived () {
        return this.cities.map((city) => `${this.name} has lived in ${city}`);
        // this.cities.forEach((city) => {
        //     console.log(`${this.name} has lived in ${city}`);
        // });
    }
}

console.log(user.printPlacesLived());

const multiplier = {
    numbers: [1, 2, 3],
    multipleBy: 2,
    multiply() {
        return this.numbers.map((number) => number * this.multipleBy);
    }
}

console.log(multiplier.multiply());