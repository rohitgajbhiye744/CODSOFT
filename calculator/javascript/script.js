document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    
    let currentInput = '0';
    let previousInput = '';
    let operator = '';

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            const value = button.getAttribute('data-value');
            
            if (value === 'C') {
                currentInput = '0';
                previousInput = '';
                operator = '';
                updateDisplay();
                return;
            }
            
            if (value === '=') {
                if (currentInput !== '' && previousInput !== '' && operator !== '') {
                    currentInput = evaluate(previousInput, currentInput, operator);
                    previousInput = '';
                    operator = '';
                    updateDisplay();
                }
                return;
            }
            
            if (['+', '-', '*', '/'].indexOf(value) > -1) {
                if (currentInput !== '') {
                    if (previousInput === '') {
                        previousInput = currentInput;
                    } else {
                        previousInput = evaluate(previousInput, currentInput, operator);
                    }
                    currentInput = '';
                }
                operator = value;
                updateDisplay();
                return;
            }
            
            if (value === '+/-') {
                currentInput = (parseFloat(currentInput) * -1).toString();
                updateDisplay();
                return;
            }
            
            if (value === '%') {
                currentInput = (parseFloat(currentInput) / 100).toString();
                updateDisplay();
                return;
            }

            if (value === '.') {
                if (!currentInput.includes('.')) {
                    currentInput += value;
                }
                updateDisplay();
                return;
            }

            if (currentInput === '0') {
                currentInput = value;
            } else {
                currentInput += value;
            }
            updateDisplay();
        });
    });

    function evaluate(firstOperand, secondOperand, operator) {
        const num1 = parseFloat(firstOperand);
        const num2 = parseFloat(secondOperand);
        
        if (operator === '+') return (num1 + num2).toString();
        if (operator === '-') return (num1 - num2).toString();
        if (operator === '*') return (num1 * num2).toString();
        if (operator === '/') return (num1 / num2).toString();
        
        return secondOperand;
    }

    function updateDisplay() {
        let displayValue = '';
        if (previousInput !== '') {
            displayValue += previousInput;
        }
        if (operator !== '') {
            displayValue += ' ' + operator;
        }
        if (currentInput !== '') {
            displayValue += ' ' + currentInput;
        }
        display.textContent = displayValue.trim() || '0';
    }
});
