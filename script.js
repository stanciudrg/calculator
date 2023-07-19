let number1 = [];
let number2 = [];
let operator = undefined;
let operating = false;
let equalized = false;

const output = document.querySelector('.output');
const numberButtons = document.querySelectorAll('.number-buttons');
const operatorButtons = document.querySelectorAll('.operator-buttons');
const equalsButton = document.querySelector('#equals');
const allClearButton = document.querySelector('#allclear');
const clearButton = document.querySelector('#clear');
const plusMinusButton = document.querySelector('#plusminus');

numberButtons.forEach(button => button.addEventListener('click', displayNumbers));
operatorButtons.forEach(button => button.addEventListener('click', selectOperator));
equalsButton.addEventListener('click', equalize);
allClearButton.addEventListener('click', allClear);
clearButton.addEventListener('click', clear);
plusMinusButton.addEventListener('click', changeOperator);

function operate() {

    if (number1.length == 0 || number2.length == 0) { return };

    let a = Number(number1.join(''));
    let b = Number(number2.join(''));

    switch (operator) {

        case ' + ':

            number1 = roundDecimals(a + b, 8).split('');
            number2 = [];
            output.textContent = number1.join('');
            break;

        case ' - ':

            number1 = roundDecimals(a - b, 8).split('');
            number2 = [];
            output.textContent = number1.join('');
            break;

        case ' x ':

            number1 = roundDecimals(a * b, 8).split('');
            number2 = [];
            output.textContent = number1.join('');
            break;

        case ' / ':

            if (number1 == '0' || number2 == '0') {

                allClear()
                output.textContent = 'ERROR';

            } else {

                number1 = roundDecimals(a / b, 8).split('');
                number2 = [];
                output.textContent = number1.join('');

            } break;

    }

    if ((number1.length > 10 && !number1.includes('.') && number1.includes('-')) ||
        (number1.length > 9 && !number1.includes('.') && !number1.includes('-'))) {

        number1 = Number(number1.join('')).toExponential(4).split('');
        output.textContent = number1.join('');

    }

    function roundDecimals(number, places) {

        let limitDecimalPlaces;
        let roundedNumber = number.toFixed(places).replace(/\.?0*$/, '');
        let roundedArray = roundedNumber.toString().split('');

        if ((roundedArray.length > 11 && roundedArray.includes('.') && roundedArray.includes('-') && !roundedArray.includes('e')) ||
            (roundedArray.length > 10 && roundedArray.includes('.') && !roundedArray.includes('-') && !roundedArray.includes('e'))) {

            limitDecimalPlaces = true;

        }

        while (limitDecimalPlaces) {

            if (places == 0) { limitDecimalPlaces = false; };
            places--;
            roundedNumber = roundDecimals(number, places);
            limitDecimalPlaces = false;

        }

        return roundedNumber;

    }

}

function displayNumbers(e) {

    if (operating == false) {

        if (equalized == true) { clear() }

        equalized = false;
        display(number1);

    } else { display(number2); }

    function display(number) {

        if (e.target.id == 'dot' && number.length == 0) { number.push('0'); }
        if (e.target.id == 'dot' && number.includes('.')) { return };
        if (number[0] == 0 && number.length > 0 && number.length < 2 && e.target.id !== 'dot') { number.splice(0, 1) };
        if (number[0] == '-' && number[1] == 0 && number[2] != '.' && number.length > 0 && e.target.id !== 'dot') { number.splice(1, 1) };

        if (number.length < 11 && number.includes('.') && number.includes('-') ||
            (number.length < 10 && number.includes('.')) ||
            (number.length < 10 && number.includes('-')) ||
            (number.length < 9)) {

            number.push(e.target.textContent)
            output.textContent = number.join('');
            unselectOperators()

        };

    }

}

function changeOperator() {

    operating == false ? change(number1) : change(number2)

    function change(number) {

        if (number[0] == '-') {

            number.splice(0, 1);
            output.textContent = number.join('');

        } else {

            if (number.length == 0) { number.unshift('0'); }

            number.unshift('-')
            output.textContent = number.join('');

        }

    }

}

function clear() {

    if (operating == false) {

        number1 = ['0'];
        output.textContent = number1.join('');

    } else if (operating == true && number2.length == 0) {

        number1 = ['0'];
        output.textContent = number1.join('');
        stopOperating();
        unselectOperators();

    } else if (operating == true && number1.length != 0) {

        number2 = ['0'];
        output.textContent = number2.join('');

    }
};

function selectOperator(e) {

    number1.length > 0 ? operating = true : operating = false;

    if (number2.length > 0) { operate() }

    operator = e.target.textContent;
    unselectOperators()
    this.classList.add('selected');

}

function allClear() {

    output.textContent = '0';
    number1 = [];
    number2 = [];
    stopOperating();
    unselectOperators();
};


function equalize() {

    operate();
    equalized = true;
    stopOperating();
    unselectOperators();

};

function stopOperating() {

    operator = undefined;
    operating = false;

};

function unselectOperators() { operatorButtons.forEach(button => { button.classList.remove('selected') }) };

document.addEventListener('keydown', (e) => {

    e.preventDefault();

    switch (e.key) {

        case 'Escape':

            allClear();
            break;

        case 'Backspace':

            clear();
            break;

        case 'Enter':

            equalize();
            break;

        case '=':

            equalize();
            break;

        case '+':

            selectOperatorByKbd();
            operator = ' + ';
            break;

        case '-':

            selectOperatorByKbd();
            operator = ' - ';
            break;

        case 'x':

            selectOperatorByKbd();
            operator = ' x ';
            break;

        case 'X':

            selectOperatorByKbd();
            operator = ' x ';
            break;

        case '*':

            selectOperatorByKbd();
            operator = ' x ';
            break;


        case '/':

            selectOperatorByKbd();
            operator = ' / ';
            break;

        case ':':

            selectOperatorByKbd();
            operator = ' / ';
            break;

    }

    function selectOperatorByKbd() {

        number1.length > 0 ? operating = true : operating = false;
        if (number2.length > 0) { operate() }
        unselectOperators()

    }

    if (((e.key >= 0 && e.key <= 9) || e.key == '.') && e.key !== ' ') {

        if (operating == false) {

            if (equalized == true) { clear() }

            equalized = false;
            display(number1);

        } else { display(number2); }

        function display(number) {

            if (e.key == '.' && number.length == 0) { number.push('0'); }
            if (e.key == '.' && number.includes('.')) { return };
            if (number[0] == 0 && number.length > 0 && number.length < 2 && e.key !== '.') { number.splice(0, 1) };
            if (number[0] == '-' && number[1] == 0 && number[2] != '.' && number.length > 0 && e.key !== '.') { number.splice(1, 1) };

            if (number.length < 11 && number.includes('.') && number.includes('-') ||
                (number.length < 10 && number.includes('.')) ||
                (number.length < 10 && number.includes('-')) ||
                (number.length < 9)) {

                number.push(e.key)
                output.textContent = number.join('');
                unselectOperators()

            };

        }

    }

})
