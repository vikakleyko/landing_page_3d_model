/* eslint-disable no-loop-func */
/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable prefer-const */
/* eslint-disable indent */
/* eslint-disable strict */
"use strict";

const imgOnHover = () => {
  const changeImage = event => {
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
};
export default imgOnHover;
