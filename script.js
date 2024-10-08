const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const del = document.getElementById('delete');

let currentInput = '';
let previousInput = '';
let operator = null;

function updateDisplay() {
    display.textContent = currentInput || '0';
}

function handleNumber(number) {
    if (number === '.' && currentInput.includes('.')) return; 
    currentInput += number;
}

function handleOperator(op) {
    if (currentInput === '' && previousInput === '') return; 
    if (currentInput === '' && previousInput !== '') {
        operator = op;
        return;
    }
    if (previousInput !== '') {
        compute();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function compute() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch(operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current === 0 ? 'Error' : prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if(button.classList.contains('number')) {
            handleNumber(value);
            updateDisplay();
        }

        if(button.classList.contains('operator')) {
            handleOperator(value);
            updateDisplay();
        }

        if(button.classList.contains('function')) {
            if(button.id === 'clear') {
                clearAll();
            }
            if(button.id === 'delete') {
                deleteLast();
            }
        }

        if(button.classList.contains('decimal')) {
            handleNumber(value);
            updateDisplay();
        }
    });
});

equals.addEventListener('click', () => {
    compute();
    updateDisplay();
});

updateDisplay();

document.addEventListener('keydown', (e) => {
    const key = e.key;

    if ((key >= '0' && key <= '9') || key === '.') {
        handleNumber(key);
        updateDisplay();
    }

    if (['+', '-', '*', '/'].includes(key)) {
        handleOperator(key);
        updateDisplay();
    }

    if (key === 'Enter' || key === '=') {
        compute();
        updateDisplay();
    }

    if (key === 'Backspace') {
        deleteLast();
        updateDisplay();
    }

    if (key === 'Escape') {
        clearAll();
        updateDisplay();
    }
});
