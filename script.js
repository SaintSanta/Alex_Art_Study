class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.readyToReset = false;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '' && this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand),
      current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "^":
        computation = prev ** current;
        break;
      case "+/-":
        computation = (-1) * current;
        break;  
      default:
        return;
    }
    if (Number.isInteger(computation)) {
      this.currentOperand = computation;
    } else this.currentOperand = +computation.toFixed(4);
    this.readyToReset = true;
    this.operation = undefined;
    this.previousOperand = "";
    return this.currentOperand;
  }



  computeSquareRoot(operation) {
    let computation;
    const current = parseFloat(this.currentOperand);
    const previous = parseFloat(this.previousOperand);
    if (isNaN(current)) return;
    else if (!isNaN(current) && !isNaN(previous)) {
      let num = this.chooseOperation(operation),
        res = Math.sqrt(num);
      console.log(res);
      computation = res;
    } else if (current < 0) {
      this.currentOperandText.innerText =
        "Error!\n Negative Number.";
    } else {
      computation = Math.sqrt(current);
      console.log(computation);
    }
    this.currentOperand = computation;
    this.readyToReset = true;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
  
  updateDisplay() {
    this.currentOperandText.innerText = 
    this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandText.innerText = 
      `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else this.previousOperandText.innerText = "";
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const  operationButtons = document.querySelectorAll("[data-operation]");
const  equalButton = document.querySelector("[data-equals]");
const  allClearButton = document.querySelector("[data-all-clear]");
const  previousOperandText = document.querySelector("[data-previous-operand]");
const  currentOperandText = document.querySelector("[data-current-operand]");
const  deleteButton = document.querySelector("[data-delete]");

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
  button.addEventListener("click", () => {

      if(calculator.previousOperand === "" &&
      calculator.currentOperand !== "" &&
  calculator.readyToReset) {
          calculator.currentOperand = "";
          calculator.readyToReset = false;
      }
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay();
  })
})

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.symbol === "√") {
      calculator.computeSquareRoot(button.dataset.symbol);
    } else 
    calculator.chooseOperation(button.dataset.symbol);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.symbol === "+/-") {
      calculator.computeChangeSymbol(button.dataset.symbol);
    } else 
    calculator.chooseOperation(button.dataset.symbol);
    calculator.updateDisplay();
   });
  });


equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});