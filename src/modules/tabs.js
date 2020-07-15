/* eslint-disable no-loop-func */
/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable prefer-const */
/* eslint-disable indent */
/* eslint-disable strict */
"use strict";
// eslint-disable-next-line no-unused-vars
const tabs = () => {
  const tabHeader = document.querySelector(".service-header"),
    tab = document.querySelectorAll(".service-header-tab"),
    tabContent = document.querySelectorAll(".service-tab");

  const toggleContent = index => {
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
export default tabs;
