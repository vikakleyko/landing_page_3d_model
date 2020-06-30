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
  countTimer("1 july 2020");

  // menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu"),
      menu = document.querySelector("menu"),
      closeBtn = document.querySelector(".close-btn"),
      menuItems = menu.querySelectorAll("ul>li");

    const handleMenu = () => {
      menu.classList.toggle("active-menu");
    };

    btnMenu.addEventListener("click", handleMenu);
    closeBtn.addEventListener("click", handleMenu);
    menuItems.forEach(item => { 
      item.addEventListener("click", handleMenu);
    });
  };

  toggleMenu();

  // popup
  const togglePopup = () => {
    console.log(window.innerWidth);

    const popup = document.querySelector(".popup"),
    popupBtn = document.querySelectorAll(".popup-btn"),
    popupClose = document.querySelector(".popup-close");

    popupBtn.forEach(elem => elem.addEventListener("click", () => {
      popup.style.display = "block";
    }));

    popupClose.addEventListener("click", () => {
      popup.style.display = "none";
    });
  };


  togglePopup();
});
