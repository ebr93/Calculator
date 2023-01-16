// hold numbers and operation
let A = [];
let B = [];
let ope = "none";

// document classes that are manipulated
const numberA = document.querySelectorAll('.number');
const numberB = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operations')
const equals = document.querySelector('.equals')
const clear = document.querySelector('.clear')
const screen = document.querySelector('#screen')

const calculator = {
    fNumber: 0,

    sNumber: 0,

    operation: ope,
};

// functions needed to perform calculations
const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    if (a === 0 && b === 0) {
        return screen.innerText = "impossible";
    }
    return a / b;
}

// performs operation 
function operate(firstNumber, secondNumber, operation) {
    if (operation === "add") {
        A = add(firstNumber, secondNumber);
        console.log(A);
        calculator.fNumber = A;
        if (A.toString > 17 & A.toString < 21) {
            screen.innerText = modNumber(A);
        } else {
            screen.innerText = A;
        }
    } else if (operation === "subtract") {
        A = subtract(firstNumber, secondNumber);
        console.log(A);
        calculator.fNumber = A;
        if (A.toString > 17 & A.toString < 21) {
            screen.innerText = modNumber(A);
        } else {
            screen.innerText = A;
        }
    } else if (operation === "multiply") {
        A = multiply(firstNumber, secondNumber);
        console.log(A);
        calculator.fNumber = A;
        if (A.toString > 17 & A.toString < 21) {
            screen.innerText = modNumber(A);
        } else {
            screen.innerText = A;
        }
    } else if (operation === "divide") {
        A = divide(firstNumber, secondNumber);
        console.log(A);
        calculator.fNumber = A;
        if (A.toString > 17 & A.toString < 21) {
            screen.innerText = modNumber(A);
        } else {
            screen.innerText = A;
        }
    }
}

// if number is greater than display limit, then return (NUMBER E^#)
function modNumber(number) {
    n = Math.round(number);
    let str = n.toString()
    console.log(`str ${str}`);
    console.log(`length ${str.length}`);
    if (str.includes(".")) {
        str = str.replace('.', '');
    }
    let sub = str.substring(0,4);
    console.log(`sub ${sub}`);
    let arr = Array.from(sub);
    console.log(`arr ${arr}`);
    let result = arr[0] + '.';
    for (i = 1; i < arr.length; i++) {
        result += arr[i];
    }
    console.log(result);
    let num = result
    let exponent = str.length-1;
    return `${result}e+${exponent}`;
}

// EVENTS LISTENERS
// Populates 1st number Clicking
// is only used in the first cycle, unless clear is clicked to restart
numberA.forEach(number => 
    number.addEventListener('click', function() {
        if (ope === 'none') {
            // cannot have more than 1 decimal point
            if (A.includes(".") && number.id === ".") {
                return;
            } else if (A.length == 17) return;

            A.push(number.id)
            screen.innerText = A.join("");
        }
    }
));

// Populates operation Clicking
// (ope === 'none') helps to differentiate the cycle in which calculator is in
operations.forEach(operation => 
    operation.addEventListener('click', function() {
        if (ope === 'none') {
            calculator.fNumber = parseFloat(A.join(""));
        }

        ope = operation.id;
        calculator.operation = ope;
        screen.innerText = operation.textContent;
    }
));

// Populates the 2nd number Clicking
numberB.forEach(number =>
    number.addEventListener('click', function() {
        if (ope != "none") {
            if (B.includes(".") && number.id === ".") {
                return;
            } else if (B.length == 17) return;

            B.push(number.id)
            screen.innerText = B.join("");
        }
    }
));

// triggers operate function and resets certain values to cycle again
equals.addEventListener('click', function() {
    // will trigger if second number has populated
    if (B != []) {
        calculator.sNumber = parseFloat(B.join(""));
        operate(calculator.fNumber, calculator.sNumber, ope)
        A = Array.from(String(A), Number);
        ope = "empty";
        B = [];
    }
})

// clear function of calculator, resets values to default
clear.addEventListener('click', function() {
    screen.innerText = 0;
    A = [];
    B = [];
    ope = "none";
})

// Populates 1st Number using keys
function firstN(e) {
    // const key = document.querySelectorAll(`.number[data-key="${e.keyCode}"]`)
    if (ope === 'none') {
        if (isNaN(e.key)) return;
        else if (A.length > 17) return;
        else if (A.includes(".") && (e.key) === ".") return;

        A.push(e.key);
        screen.innerText = A.join("");
    }
}

// Populates 2nd Number using keys
function secondN(e) {
    // const key = document.querySelectorAll(`.number[data-key="${e.keyCode}"]`)
    if (ope != "none") {
        if (isNaN(e.key)) return;
        else if (B.length > 17) return;
        else if (B.includes(".") && (e.key) === ".") return;

        B.push(e.key);
        screen.innerText = B.join("");
    }
}

window.addEventListener('keydown', firstN);
window.addEventListener('keydown', secondN);