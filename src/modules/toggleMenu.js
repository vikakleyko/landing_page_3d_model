/* eslint-disable no-loop-func */
/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable prefer-const */
/* eslint-disable indent */
/* eslint-disable strict */
"use strict";

// eslint-disable-next-line no-unused-vars
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
export default toggleMenu;
