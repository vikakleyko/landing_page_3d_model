
"use strict";

import "@babel/polyfill";
import "nodelist-foreach-polyfill";
import "formdata-polyfill";
import elementClosest from "element-closest";
elementClosest(window);
import "es6-promise";
import "fetch-polyfill";

import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopup from "./modules/togglePopup";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import calculate from "./modules/calculate";
import sendForm from "./modules/sendForm";
import imgOnHover from "./modules/replaceImgOnHover";


// timer
countTimer("20 july 2020");

// menu
toggleMenu();

// popup
togglePopup();

// tabs
tabs();

// slider
slider();

// replace card on hover
imgOnHover();

// calc
calculate(100);

// send ajax form
sendForm();
