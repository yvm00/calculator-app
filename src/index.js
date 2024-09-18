let currentDisplay = '0';
let resultDisplay = false;
let firstNum = '';
let secondNum = '';
let operator = '';
let temRes = '';

// const lightTheme = './src/styles/light.b152146b.css';
// const darkTheme = './src/styles/dark.d1ed3a19.css';

// document.addEventListener('DOMContentLoaded', setTheme)
// const theme = document.getElementById('theme');

// const icon = document.querySelector('.material-icons');
// icon.addEventListener('click', changeTheme);
// function changeTheme() {
//     console.log(theme.getAttribute('href'));
//     if (theme.getAttribute('href') == lightTheme) {
//         theme.href = darkTheme;
//         icon.innerHTML = 'brightness_2';
//         localStorage.setItem('theme', darkTheme);
//         localStorage.setItem('icon', 'brightness_2');
//     } else {
//         theme.href = lightTheme;
//         icon.innerHTML = 'brightness_5';
//         localStorage.setItem('theme', lightTheme);
//         localStorage.setItem('icon', 'brightness_5');
//     }
// }

// function setTheme() {
//   theme.href = localStorage.getItem('theme') || './src/styles/light.b152146b.css';
//   icon.innerHTML = localStorage.getItem('icon') || 'light_mode';
// }

const btnNum = document.querySelectorAll('[data-type="number"]');
btnNum.forEach((el) =>
    el.addEventListener('click', (event) => {
        const btnValue = event.target.textContent;

        if ((firstNum.length !== 13 && operator === '') || resultDisplay) {
            firstNum += btnValue;
            console.log('first = ' + firstNum);
            currentDisplay = firstNum;
        } else if (secondNum.length !== 13 && operator !== '') {
            currentDisplay = '';
            secondNum += btnValue;
            console.log('second = ' + secondNum);
            currentDisplay = secondNum;
        }

        resultDisplay = false;
        updateDisplay();
    })
);

const btnOp = document.querySelectorAll('[data-type="operator"]');
btnOp.forEach((el) =>
    el.addEventListener('click', (event) => {
        const btnValue = event.target.textContent;

        if (operator === '') {
            operator = btnValue;
            console.log(operator);
        } else {
            calculateResult();
            operator = '';
            operator = btnValue;
            console.log(operator);
        }
        resultDisplay = false;
    })
);

function updateDisplay() {
    const displayElement = document.querySelector('.screen__input');
    displayElement.value = currentDisplay;
}

const res = document.querySelector('[data-type="equal"]');
res.addEventListener('click', calculateFinalResult);

function calculateFinalResult() {
    calculateResult();
    temRes = '';
    operator = '';
}

function calculateResult() {
    let result;
    operator = operator.replace(/x/g, '*');
    try {
        currentDisplay = '';

        if (temRes !== '') {
            result = eval(temRes + operator + secondNum).toFixed(2);
        } else {
            result = eval(firstNum + operator + secondNum).toFixed(2);
        }
        temRes = result;
        console.log('temRes =' + temRes);
        currentDisplay += result.toString();
        updateDisplay();
        firstNum = '';
        secondNum = '';
    } catch (error) {
        currentDisplay += '\nError';
        updateDisplay();
    }
    resultDisplay = true;
}

const del = document.querySelector('[data-type="del"]');
del.addEventListener('click', clearLastElement);

function clearLastElement() {
    currentDisplay = currentDisplay.slice(0, -1);
    if (currentDisplay === '') {
        currentDisplay = '0';
    }
    updateDisplay();
}

const reset = document.querySelector('[data-type="reset"]');
reset.addEventListener('click', clearDisplay);
function clearDisplay() {
    currentDisplay = '0';
    firstNum = '';
    secondNum = '';
    operator = '';
    resultDisplay = false;
    updateDisplay();
}
