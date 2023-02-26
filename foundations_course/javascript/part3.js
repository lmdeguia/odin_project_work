
// problem 1
// function add7(num){
//     return num + 7;
// }


// try arrow functions
let add7 = (num) => num + 7;

//problem 2
// function multiply(n1, n2){
//     return n1 * n2;
// }

let multiply = (n1, n2) => n1*n2;

// problem 3
// function capitalize(s){
//     part1 = s.charAt(0).toUpperCase();
//     part2 = s.slice(1).toLowerCase();
//     return part1 + part2;
// }


let capitalize = (s) => {

    part1 = s.charAt(0).toUpperCase();
    part2 = s.slice(1).toLowerCase();
    return part1 + part2;
};


//problem 4
// function lastLetter(s){
//     return s[s.length - 1];
// }





let lastLetter = (s) => s[s.length - 1];





let s = 'abcd';
let out = capitalize(s);
console.log(out);