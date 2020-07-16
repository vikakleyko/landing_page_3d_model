/* eslint-disable no-loop-func */
/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable prefer-const */
/* eslint-disable indent */
/* eslint-disable strict */
"use strict";
// eslint-disable-next-line no-unused-vars
const sendForm = () => {
  const valideNumber = number => {
    const phonePattern = /^[+]?\d{10}/;
    return !!(number && number.match(phonePattern));
  };
  //   /^[+]?\d+$/
  const valideText = text => {
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

  const timerToClearMessage = () => setTimeout(() => {
    statusMessage.textContent = "";
  }, 8000);

  const postData = body => {
    return fetch("./server.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
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
      timerToClearMessage();
      postData(body)
        .then(response => {
          if (response.status !== 200) {
            throw new Error("status network is not 200");
          }
          statusMessage.textContent = successMessage;
        })
        .catch(error => {
          statusMessage.textContent = errorMessage;
        });
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

    if (
      valideNumber(inputPhone2.value) &&
      valideText(inputName2.value) &&
      valideText(inputMessage2.value)
    ) {
      timerToClearMessage();
      postData(body)
        .then(response => {
          if (response.status !== 200) {
            throw new Error("status network is not 200");
          }
          statusMessage.textContent = successMessage;
        })
        .catch(error => {
          statusMessage.textContent = errorMessage;
        });
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

    if (valideNumber(inputPhone3.value) && valideText(inputName3.value)) {
      timerToClearMessage();
      postData(body)
        .then(response => {
          if (response.status !== 200) {
            throw new Error("status network is not 200");
          }
          statusMessage.textContent = successMessage;
        })
        .catch(error => {
          statusMessage.textContent = errorMessage;
        });
      inputName3.value = "";
      inputEmail3.value = "";
      inputPhone3.value = "";
    } else {
      statusMessage.textContent = invalidInputaMessage;
    }
  });
};
export default sendForm;
