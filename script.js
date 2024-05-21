document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '';
    let operator = null;
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operator = null;
                display.innerText = '0';
                return;
            }

            if (value === '=') {
                if (operator && previousInput !== '' && currentInput !== '') {
                    currentInput = eval(${previousInput}${operator}${currentInput});
                    display.innerText = currentInput;
                    previousInput = '';
                    operator = null;
                }
                return;
            }

            if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput === '' && previousInput !== '') {
                    operator = value;
                    return;
                }

                if (currentInput !== '') {
                    if (previousInput !== '') {
                        previousInput = eval(${previousInput}${operator}${currentInput});
                    } else {
                        previousInput = currentInput;
                    }
                    operator = value;
                    currentInput = '';
                    display.innerText = previousInput;
                }
                return;
            }

            if (value === '.' && currentInput.includes('.')) {
                return;
            }

            currentInput += value;
            display.innerText = currentInput;
        });
    });
});