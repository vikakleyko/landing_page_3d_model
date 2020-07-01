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
        target.closest("a") ||
        target.closest(".menu")
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
});
