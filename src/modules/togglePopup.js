/* eslint-disable no-loop-func */
/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable prefer-const */
/* eslint-disable indent */
/* eslint-disable strict */
"use strict";
// eslint-disable-next-line no-unused-vars
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
export default togglePopup;
