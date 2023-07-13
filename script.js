let number1 = [];
let number2 = [];
let operator = undefined;
let operating = false;

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
    switch (operator) {
        case ' + ':
            number1 = add().split('');
            number2 = [];
            output.textContent = number1.join('');
            break;
        case ' - ':
            number1 = subtract().split('');
            number2 = [];
            output.textContent = number1.join('');;
            break;
        case ' x ':
            number1 = multiply().split('');
            number2 = [];
            output.textContent = number1.join('');
            break;
        case ' / ':
            if (number1 == 0 || number2 == 0) {
                clear()
                output.textContent = 'ERROR';
            } else {
                output.textContent = divide();
                number1 = divide().split('');
                number2 = [];
            }
            break;
    }
    function roundDecimals(number) { return number.toFixed(4).replace(/\.?0*$/, ''); }
    function add() { return roundDecimals(Number(number1.join('')) + Number(number2.join(''))) };
    function subtract() { return roundDecimals(Number(number1.join('')) - Number(number2.join(''))) };
    function multiply() { return roundDecimals(Number(number1.join('')) * Number(number2.join(''))) };
    function divide() { return roundDecimals(Number(number1.join('')) / Number(number2.join(''))) };
}

function displayNumbers(e) {
    if (e.target.id == 'dot' && output.textContent.includes('.')) { return }
    if (operating == false) {
        number1.push(e.target.textContent);
        output.textContent = number1.join('');
    } else {
        number2.push(e.target.textContent);
        output.textContent = number2.join('');
        unselectOperators();
    }
}


function selectOperator(e) {
    operating = true;
    if (number2.length > 0) {

        operate();
        operator = e.target.textContent;

    }
    else {

        operator = e.target.textContent;

    }

    unselectOperators();
    this.classList.add('selected');

}

function clear() {
    output.textContent = '0';
    number1 = [];
    number2 = [];
    stopOperating();
    unselectOperators();
}


function equalize() {
    operate();
    stopOperating()
    unselectOperators();
}

function stopOperating() {

    operator = undefined;
    operating = false;

}

function unselectOperators() { operatorButtons.forEach(button => { button.classList.remove('selected') }) }