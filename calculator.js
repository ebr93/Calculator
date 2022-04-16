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

    operate: function() {
        result = this.firstNumber * this.secondNumber;
        return result;
    },
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

// proceeds to solve the equation
function operate(firstNumber, secondNumber, operation) {
    if (operation === "add") {
        A = add(firstNumber, secondNumber);
        calculator.fNumber = A;
        screen.innerText = A;
    } else if (operation === "subtract") {
        A = subtract(firstNumber, secondNumber);
        calculator.fNumber = A;
        screen.innerText = A;
    } else if (operation === "multiply") {
        A = multiply(firstNumber, secondNumber);
        calculator.fNumber = A;
        screen.innerText = A;
    } else if (operation === "divide") {
        A = divide(firstNumber, secondNumber);
        calculator.fNumber = A;
        screen.innerText = A;
    }
}

// Event Listeners
// 1st Event, gets first number
// is only used in the first cycle, unless clear is clicked
numberA.forEach(number => 
    number.addEventListener('click', function() {
        if (ope === 'none') {
            if (A.includes(".") && number.id === ".") {
                return;
            }

            A.push(number.id)
            screen.innerText = A.join("");
        }
    }
));

// 2nd Event, gets operation to be used
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

// 3rd Event, gets the 2nd number
numberB.forEach(number =>
    number.addEventListener('click', function() {
        if (ope != "none") {
            if (B.includes(".") && number.id === ".") {
                return;
            }

            B.push(number.id)
            screen.innerText = B.join("");
        }
    }
));

// triggers operate function and resets certain values to cycle again
equals.addEventListener('click', function() {
    if (B != []) {
        calculator.sNumber = parseFloat(B.join(""));
        operate(calculator.fNumber, calculator.sNumber, ope)
        A = Array.from(String(A), Number);
        ope = "empty";
        B = [];
    }
})


// resets values to start again
clear.addEventListener('click', function() {
    screen.innerText = 0;
    A = [];
    B = [];
    ope = "none";
})

window.addEventListener('keydown', firstN);
window.addEventListener('keydown', secondN);

function firstN(e) {
    // const key = document.querySelectorAll(`.number[data-key="${e.keyCode}"]`)

    console.log(e.key)
    if (ope === 'none') {
        if (A.includes(".") && (e.key) === ".") {
            return;
        }

        A.push(e.key);
        screen.innerText = A.join("");
    }
}

function secondN(e) {
    // const key = document.querySelectorAll(`.number[data-key="${e.keyCode}"]`)

    console.log(e.key)
    if (ope != "none") {
        if (B.includes(".") && (e.key) === ".") {
            return;
        }

        B.push(e.key);
        screen.innerText = B.join("");
    }
}