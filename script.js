let number1 = [];
let number2 = [];
let operator = undefined;
let operating = false;

let output = document.querySelector('.output')
let numberButtons = document.querySelectorAll('.number-buttons')
let operatorButtons = document.querySelectorAll('.operator-buttons')
let equalsButton = document.querySelector('#equals')
let clearButton = document.querySelector('#clear')
let plusMinusButton = document.querySelector('#plusminus');

numberButtons.forEach(button => button.addEventListener('click', displayNumbers));
operatorButtons.forEach(button => button.addEventListener('click', selectOperator));
equalsButton.addEventListener('click', equalize);
clearButton.addEventListener('click', clear);
plusMinusButton.addEventListener('click', changeOperator);

function operate() {

    if (number1.length == 0 || number2.length == 0) { return };
    number1 = Number(number1.join(''));
    number2 = Number(number2.join(''));

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

                number1 = divide().split('');
                number2 = [];
                output.textContent = number1.join('');

            } break;

    }

    function roundDecimals(number) { return number.toFixed(4).replace(/\.?0*$/, '') }
    function add() { return roundDecimals(number1 + number2) };
    function subtract() { return roundDecimals(number1 - number2) };
    function multiply() { return roundDecimals(number1 * number2) };
    function divide() { return roundDecimals(number1 / number2) };

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

function changeOperator() {

    if (operating == false) {

        if (number1[0] == '-') {

            number1.splice(0, 1);
            output.textContent = number1.join('');

        } else {

            if (number1.length == 0) { number1.unshift('0'); }

            number1.unshift('-')
            output.textContent = number1.join('');

        }

    } else {

        if (number2[0] == '-') {

            number2.splice(0, 1);
            output.textContent = number2.join('')

        } else {

            if (number2.length == 0) { number2.unshift('0'); }

            number2.unshift('-')
            output.textContent = number2.join('');

        }
    }
}

function selectOperator(e) {

    number1.length > 0 ? operating = true : operating = false;

    if (number2.length > 0) {

        operate();
        operator = e.target.textContent;

    } else {

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