let calculator = {
    number1: [],
    number2: [],
    operator: undefined,
    operating: false,
}

let output = document.querySelector('.output')
let numberButtons = document.querySelectorAll('.number-buttons')
let operatorButtons = document.querySelectorAll('.operator-buttons')
let equalsButton = document.querySelector('#equals')
let clearButton = document.querySelector('#clear')

function operate() {

    switch (calculator.operator) {
        case ' + ':
            output.textContent = add()
            calculator.number1 = [add()];
            calculator.number2 = [];
            break;
        case ' - ':
            output.textContent = subtract();
            calculator.number1 = [subtract()];
            calculator.number2 = [];
            break;
        case ' x ':
            output.textContent = multiply();
            calculator.number1 = [multiply()];
            calculator.number2 = [];
            break;
        case ' / ':
            output.textContent = divide();
            calculator.number1 = [divide()];
            calculator.number2 = [];
            break;
    }

    function add() { return Number(calculator.number1.join('')) + Number(calculator.number2.join('')) };
    function subtract() { return Number(calculator.number1.join('')) - Number(calculator.number2.join('')) };
    function multiply() { return Number(calculator.number1.join('')) * Number(calculator.number2.join('')) };
    function divide() { return Number(calculator.number1.join('')) / Number(calculator.number2.join('')) };

}