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

numberButtons.forEach(button => button.addEventListener('click', displayNumbers));
operatorButtons.forEach(button => button.addEventListener('click', selectOperator));
equalsButton.addEventListener('click', equalize);
clearButton.addEventListener('click', clear);

function displayNumbers(e) {

    if (calculator.operating == false) {
        calculator.number1.push(e.target.textContent);
        output.textContent = calculator.number1.join('');
    } else {
        calculator.number2.push(e.target.textContent);
        output.textContent = calculator.number2.join('');
    }

}

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

function selectOperator(e) {

    calculator.operating = true;
    let add = document.getElementById('add');
    let subtract = document.getElementById('subtract');
    let multiply = document.getElementById('multiply');
    let divide = document.getElementById('divide');

    if (calculator.number2.length > 0) {
        operate();
        calculator.operator = e.target.textContent;
    }
    else {
        calculator.operator = e.target.textContent;
    }

    if (e.target == add) {
        add.classList.add('selected');
        subtract.classList.remove('selected');
        multiply.classList.remove('selected');
        divide.classList.remove('selected');
    } else if (e.target == subtract) {
        subtract.classList.add('selected');
        add.classList.remove('selected');
        multiply.classList.remove('selected');
        divide.classList.remove('selected');
    } else if (e.target == multiply) {
        multiply.classList.add('selected');
        add.classList.remove('selected');
        subtract.classList.remove('selected');
        divide.classList.remove('selected');
    } else if (e.target == divide) {
        divide.classList.add('selected');
        add.classList.remove('selected');
        multiply.classList.remove('selected');
        subtract.classList.remove('selected');
    }

}

function equalize() {

    operate();
    add.classList.remove('selected');
    subtract.classList.remove('selected');
    multiply.classList.remove('selected');
    divide.classList.remove('selected');

}

function clear() {

    output.textContent = '0';
    calculator.number1 = [];
    calculator.number2 = [];
    calculator.operator = undefined;
    calculator.operating = false;
    add.classList.remove('selected');
    subtract.classList.remove('selected');
    multiply.classList.remove('selected');
    divide.classList.remove('selected');

}