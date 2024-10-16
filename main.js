let a = 1;
let b = 2;
const sum = a + b;

console.log(sum) // 3

a = 2;

console.log(sum) // ?

// how we can change sum when a or b changes?

// maybe some magic operand like $...

let d = 10
let e = 20
// const sum1 $= d + e 

console.log(sum1) // 30

d = 15
console.log(sum1) // 35






























// ------------ Solution 1: Functions -----------
let f = 5
let g = 7

function calcSum() {
  return f + g
}

let sum3 = calcSum()

console.log(sum3) // 12

// how to update sum when f changes?
f = 10
console.log(sum3) // 12  ... Oops!

sum3 = calcSum()
console.log(sum3) // 15  ... Yesk!

// but there is no magic here
