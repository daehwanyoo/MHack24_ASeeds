(function() {
  "use strict";

  let plantData = {}; // Store plant info for each button
  let usedImages = new Set(); // Track used images

  window.addEventListener("load", init);

  function init() {
    qsa(".plus-button button").forEach((button, index) => {
      button.addEventListener("click", function() {
        openPopup(index, button);
      });
    });

    // Make the plant images clickable as well
    qsa(".plant img").forEach((plantImg, index) => {
      plantImg.addEventListener("click", function() {
        openPopup(index, plantImg);
      });
    });
  }

  function openPopup(index, element) {
    // Show the popup
    const popup = id("popup");
    popup.classList.remove("hidden");

    const confirmBtn = id("confirm-btn");
    confirmBtn.onclick = function() {
      handleConfirm(index, element);
    };

    if (plantData[index]) {
      // Pre-fill popup if data already exists
      id("plant-type").value = plantData[index].type;
      id("nickname").value = plantData[index].nickname;
      id("watered-date").value = plantData[index].wateredDate;
    } else {
      // Clear the form for new entry
      id("plant-type").value = '';
      id("nickname").value = '';
      id("watered-date").value = '';
    }
  }

  function handleConfirm(index, element) {
    const plantType = id("plant-type").value;
    const nickname = id("nickname").value;
    const wateredDate = id("watered-date").value;

    // Save the data
    plantData[index] = {
      type: plantType,
      nickname: nickname,
      wateredDate: wateredDate
    };

    // Hide popup
    id("popup").classList.add("hidden");

    // Show random plant image if it's not already displayed
    if (element.tagName.toLowerCase() === 'button') {
      const plantDiv = element.parentElement.nextElementSibling;
      if (plantDiv) {
        const randomImage = getRandomImage();
        plantDiv.querySelector("img").src = `assets/img/${randomImage}`;
        plantDiv.classList.remove("hidden");
      }

      // Hide the plus button after confirming
      element.parentElement.classList.add('hidden');
    }
  }

  function getRandomImage() {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * 8) + 1; // Random number from 1 to 8
    } while (usedImages.has(randomNumber));

    usedImages.add(randomNumber);
    return `${randomNumber}.png`;
  }

  /* ------------------------------ Helper Functions  ------------------------------ */

  function id(idName) {
    return document.getElementById(idName);
  }

  function qsa(selector) {
    return document.querySelectorAll(selector);
  }
})();
