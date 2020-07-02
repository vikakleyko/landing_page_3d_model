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
      if (target.classList.contains("close-btn") || target.closest(".menu") || (target.closest("menu") && target.closest("a"))) {
        handleMenu();
      } else
       if (!target.closest("menu") && menu.classList.contains("active-menu")) {
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

        slider.addEventListener("click", event => {
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

        slider.addEventListener("mouseover", event => {
          if (event.target.matches(".portfolio-btn, .dot")) {
            stopSlide();
          }
        });

        slider.addEventListener("mouseout", event => {
          if (event.target.matches(".portfolio-btn, .dot")) {
            startSlide();
          }
        });

        startSlide(1500);
  };

  slider();
});
