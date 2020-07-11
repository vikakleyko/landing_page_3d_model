/* eslint-disable no-loop-func */
/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable prefer-const */
/* eslint-disable indent */
/* eslint-disable strict */
window.addEventListener("DOMContentLoaded", () => {
  "use strict";
  // timer
  function countTimer(deadline) {
    let timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 3600);
      return {
        timeRemaining,
        hours,
        minutes,
        seconds,
      };
    }

    function updateTimer() {
      let timer = getTimeRemaining();
      timerHours.textContent =
        timer.hours.toString().length === 1 ? "0" + timer.hours : timer.hours;
      timerMinutes.textContent =
        timer.minutes.toString().length === 1
          ? "0" + timer.minutes
          : timer.minutes;
      timerSeconds.textContent =
        timer.seconds.toString().length === 1
          ? "0" + timer.seconds
          : timer.seconds;
    }

    let interval = setInterval(updateTimer, 1000);
    updateTimer();

    if (getTimeRemaining().timeRemaining <= 0) {
      timerHours.textContent = "00";
      timerMinutes.textContent = "00";
      timerSeconds.textContent = "00";
      clearInterval(interval);
    }
  }
  countTimer("3 july 2020");

  // menu
  const toggleMenu = () => {
    const menu = document.querySelector("menu");
    const handleMenu = () => {
      menu.classList.toggle("active-menu");
    };

    document.addEventListener("click", () => {
      let target = event.target;
      if (
        target.classList.contains("close-btn") ||
        target.closest(".menu") ||
        (target.closest("menu") && target.closest("a"))
      ) {
        handleMenu();
      } else if (
        !target.closest("menu") &&
        menu.classList.contains("active-menu")
      ) {
        menu.classList.remove("active-menu");
      }
    });
  };

  toggleMenu();

  // popup
  const togglePopup = () => {
    let popup = document.querySelector(".popup"),
      popupBtn = document.querySelectorAll(".popup-btn"),
      count = 0,
      interval;

    const show = () => {
      interval = requestAnimationFrame(show);
      count++;

      if (count <= 25) {
        popup.style.opacity = count / 25;
      } else {
        count = 0;
        cancelAnimationFrame(interval);
      }
    };

    popupBtn.forEach((elem) =>
      elem.addEventListener("click", () => {
        if (document.documentElement.clientWidth >= 768) {
          interval = requestAnimationFrame(show);
        }
        popup.style.display = "block";
      })
    );

    popup.addEventListener("click", (event) => {
      let target = event.target;

      if (target.classList.contains("popup-close")) {
        popup.style.display = "none";
      } else {
        target = target.closest(".popup-content");
        if (!target) {
          popup.style.display = "none";
        }
      }
    });
  };

  togglePopup();

  // tabs
  const tabs = () => {
    const tabHeader = document.querySelector(".service-header"),
      tab = document.querySelectorAll(".service-header-tab"),
      tabContent = document.querySelectorAll(".service-tab");

    const toggleContent = (index) => {
      tabContent.forEach((item, i) => {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tab[i].classList.remove("active");
          tabContent[i].classList.add("d-none");
        }
      });
    };

    tabHeader.addEventListener("click", () => {
      let target = event.target;
      target = target.closest(".service-header-tab");

      if (target) {
        tab.forEach((item, i) => {
          if (target === item) {
            toggleContent(i);
          }
        });
      }
    });
  };

  tabs();

  // slider

  const slider = () => {
    const slide = document.querySelectorAll(".portfolio-item"),
      btn = document.querySelectorAll(".portfolio-button"),
      slider = document.querySelector(".portfolio-content"),
      portfolioDots = document.querySelector(".portfolio-dots");

    let currentSlide = 0,
      interval;

    // add dots to slider
    const dots = () => {
      for (let i = 0; i < slide.length; i++) {
        let dotElem = document.createElement("li");
        dotElem.classList.add("dot");
        if (currentSlide === i) {
          dotElem.classList.add("dot-active");
        }
        portfolioDots.appendChild(dotElem);
      }
    };

    dots();

    const dot = document.querySelectorAll(".dot");

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");

      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener("click", (event) => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches(".portfolio-btn, .dot")) {
        return;
      }

      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");

      if (target.matches("#arrow-right")) {
        currentSlide++;
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
      } else if (target.matches(".dot")) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    });

    slider.addEventListener("mouseover", (event) => {
      if (event.target.matches(".portfolio-btn, .dot")) {
        stopSlide();
      }
    });

    slider.addEventListener("mouseout", (event) => {
      if (event.target.matches(".portfolio-btn, .dot")) {
        startSlide();
      }
    });

    startSlide(1500);
  };

  slider();

  // replace card on hover
  const changeImage = (event) => {
    const target = event.target;
    if (target.dataset.img) {
      [target.src, target.dataset.img] = [target.dataset.img, target.src];
    }
  };

  const commandPhoto = document.querySelectorAll(".command__photo");

  commandPhoto.forEach((item) => {
    item.addEventListener("mouseover", changeImage);
    item.addEventListener("mouseout", changeImage);
  });

  const warning = document.createElement("span");

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

  // send ajax form

  const sendForm = () => {

  const valideNumber = number =>  {
    const phonePattern = /^[+]?\d+$/;
    return !!(number && number.match(phonePattern));
  };

  const valideText = text =>  {
    const textPattern = /^[\u0400-\u04FF ]+$/;
    return !!(text && text.match(textPattern));
  };


    const errorMessage = "Что-то пошло не так...",
      loadMessage = "Загрузка ...",
      successMessage = "Cпасибо, мы скоро с вами свяжемся!",
      invalidInputaMessage = "Проверьте правильность заполнения всех полей";

    const form1 = document.getElementById("form1"),
      form2 = document.getElementById("form2"),
      form3 = document.getElementById("form3"),
      inputName1 = document.getElementById("form1-name"),
      inputEmail1 = document.getElementById("form1-email"),
      inputPhone1 = document.getElementById("form1-phone"),
      inputName2 = document.getElementById("form2-name"),
      inputEmail2 = document.getElementById("form2-email"),
      inputPhone2 = document.getElementById("form2-phone"),
      inputMessage2 = document.getElementById("form2-message"),
      inputName3 = document.getElementById("form3-name"),
      inputEmail3 = document.getElementById("form3-email"),
      inputPhone3 = document.getElementById("form3-phone");

    const statusMessage = document.createElement("div");
    statusMessage.textContent = "Message!";
    statusMessage.style.cssText = "font-size-2rem;";

    const postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();

      request.addEventListener("readystatechange", () => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);
        }
      });

      request.open("POST", "./server.php");
      request.setRequestHeader("Content-Type", "application/json");
      request.send(JSON.stringify(body));
    };

    form1.addEventListener("submit", event => {
      event.preventDefault();
      form1.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(form1);
      let body = {};

      for (let val of formData.entries()) {
        body[val[0]] = val[1];
      }

      if (valideNumber(inputPhone1.value) && valideText(inputName1.value)) {
        postData(body,
          () => {
            statusMessage.textContent = successMessage;
          },
          error => {
            statusMessage.textContent = errorMessage;
            console.error(error);
          }
        );
        inputName1.value = "";
        inputEmail1.value = "";
        inputPhone1.value = "";
      } else {
        statusMessage.textContent = invalidInputaMessage;
      }
    });

    form2.addEventListener("submit", event => {
      event.preventDefault();
      form2.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(form2);
      let body = {};

      for (let val of formData.entries()) {
        body[val[0]] = val[1];
      }
      if (valideNumber(inputPhone2.value) && valideText(inputName2.value) && valideText(inputMessage2.value)) {
        postData(body,
          () => {
            statusMessage.textContent = successMessage;
          },
          error => {
            statusMessage.textContent = errorMessage;
            console.error(error);
          }
        );
        inputName2.value = "";
        inputEmail2.value = "";
        inputPhone2.value = "";
        inputMessage2.value = "";
      } else {
        statusMessage.textContent = invalidInputaMessage;
      }
    });

    form3.addEventListener("submit", event => {
      event.preventDefault();
      statusMessage.style.color = "white";
      form3.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(form3);
      let body = {};

      for (let val of formData.entries()) {
        body[val[0]] = val[1];
      }

      if (valideNumber(inputPhone1.value) && valideText(inputName3.value)) {
        postData(body,
          () => {
            statusMessage.textContent = successMessage;
          },
          error => {
            statusMessage.textContent = errorMessage;
            console.error(error);
          }
        );
        inputName3.value = "";
        inputEmail3.value = "";
        inputPhone3.value = "";
      } else {
        statusMessage.textContent = invalidInputaMessage;
      }
    });
  };

  sendForm();
});
