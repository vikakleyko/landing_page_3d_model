/* eslint-disable no-loop-func */
/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable prefer-const */
/* eslint-disable indent */
/* eslint-disable strict */
"use strict";

const calculate = () => {
  const warning = document.createElement("span");

  // eslint-disable-next-line no-unused-vars
  const validate = () => {
    const target = event.target;
    const regExp = new RegExp("^\\d+$");
    let isValid = regExp.test(target.value);
    if (!isValid && target.value) {
      warning.textContent = "*numbers only allowed";
      warning.style.fontSize = "12px";
      warning.className = "red-text";
      warning.style.position = "absolute";
      target.parentNode.insertBefore(warning, target);
    } else {
      if (warning && warning.textContent) {
        warning.textContent = "";
        target.parentNode.removeChild(warning);
      }
    }
  };

  const calcSquare = document.querySelector(".calc-square"),
    calcCount = document.querySelector(".calc-count"),
    calcDay = document.querySelector(".calc-day");

  calcSquare.addEventListener("input", validate);
  calcCount.addEventListener("input", validate);
  calcDay.addEventListener("input", validate);

  // calculator
  const calc = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block"),
      calcType = document.querySelector(".calc-type"),
      calcSquare = document.querySelector(".calc-square"),
      calcDay = document.querySelector(".calc-day"),
      calcCount = document.querySelector(".calc-count"),
      totalValue = document.getElementById("total");

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;

      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * squareValue * typeValue * countValue * dayValue;
      }
      totalValue.textContent = Math.floor(total);
    };

    calcBlock.addEventListener("change", (event) => {
      const target = event.target;
      if (target.matches("input") || target.matches("select")) {
        countSum();
      }
    });
  };
  calc(100);
};

export default calculate;
