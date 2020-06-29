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
        timer.minutes.toString().length === 1 ? "0" + timer.minutes : timer.minutes;
      timerSeconds.textContent =
        timer.seconds.toString().length === 1 ? "0" + timer.seconds : timer.seconds;
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
  countTimer("30 june 2020");
});
