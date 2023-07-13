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

function operate() {
    switch (calculator.operator) {
        case ' + ':
            calculator.number1 = add().split('');
            calculator.number2 = [];
            output.textContent = calculator.number1.join('');
            break;
        case ' - ':
            calculator.number1 = subtract().split('');
            calculator.number2 = [];
            output.textContent = calculator.number1.join('');;
            break;
        case ' x ':
            calculator.number1 = multiply().split('');
            calculator.number2 = [];
            output.textContent = calculator.number1.join('');
            break;
        case ' / ':
            if (calculator.number1 == 0 || calculator.number2 == 0) {
                clear()
                output.textContent = 'ERROR';
            } else {
                output.textContent = divide();
                calculator.number1 = divide().split('');
                calculator.number2 = [];
            }
            break;
    }
    function roundDecimals(number) { return number.toFixed(4).replace(/\.?0*$/, ''); }
    function add() { return roundDecimals(Number(calculator.number1.join('')) + Number(calculator.number2.join(''))) };
    function subtract() { return roundDecimals(Number(calculator.number1.join('')) - Number(calculator.number2.join(''))) };
    function multiply() { return roundDecimals(Number(calculator.number1.join('')) * Number(calculator.number2.join(''))) };
    function divide() { return roundDecimals(Number(calculator.number1.join('')) / Number(calculator.number2.join(''))) };
}

function displayNumbers(e) {
    if (e.target.id == 'dot' && output.textContent.includes('.')) { return }
    if (calculator.operating == false) {
        calculator.number1.push(e.target.textContent);
        output.textContent = calculator.number1.join('');
    } else {
        calculator.number2.push(e.target.textContent);
        output.textContent = calculator.number2.join('');
        unselectOperators();
    }
}


function selectOperator(e) {
    calculator.operating = true;
    if (calculator.number2.length > 0) {

        operate();
        calculator.operator = e.target.textContent;

    }
    else {

        calculator.operator = e.target.textContent;

    }

    unselectOperators();
    this.classList.add('selected');

}

function clear() {
    output.textContent = '0';
    calculator.number1 = [];
    calculator.number2 = [];
    stopOperating();
    unselectOperators();
}


function equalize() {
    operate();
    stopOperating()
    unselectOperators();
}

function stopOperating() {

    calculator.operator = undefined;
    calculator.operating = false;

}

function unselectOperators() { operatorButtons.forEach(button => { button.classList.remove('selected') }) }