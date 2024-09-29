(function() {
    "use strict";
  
    let plantData = {}; // Store plant info for each button
    let usedImages = new Set(); // Track used images
    let totalPlantsAdded = 0; // Track the total plants added by the user
  
    window.addEventListener("load", init);
  
    function init() {
      qsa(".plus-button button").forEach((button, index) => {
        button.addEventListener("click", function() {
          openPopup(index, button);
        });
      });
  
      qsa(".plant img").forEach((plantImg, index) => {
        plantImg.addEventListener("click", function() {
          openPopup(index, plantImg);
        });
      });
  
      // Profile popup logic
      const profilePic = document.querySelector(".profile-pic");
      profilePic.addEventListener("click", openProfilePopup);
  
      const closeProfileBtn = id("close-profile-btn");
      closeProfileBtn.addEventListener("click", closeProfilePopup);
    }
  
    function openProfilePopup() {
      const profilePopup = id("profile-popup");
      profilePopup.classList.remove("hidden");
  
      // Fill profile popup fields
      id("email-id").value = "user@example.com"; // Replace with actual user email
      id("username").value = "username"; // Replace with actual username
      id("total-plants").value = totalPlantsAdded;
    }
  
    function closeProfilePopup() {
      const profilePopup = id("profile-popup");
      profilePopup.classList.add("hidden");
    }
  
    function openPopup(index, element) {
      const popup = id("popup");
      popup.classList.remove("hidden");
  
      const confirmBtn = id("confirm-btn");
      confirmBtn.onclick = function() {
        handleConfirm(index, element);
      };
  
      if (plantData[index]) {
        id("plant-type").value = plantData[index].type;
        id("nickname").value = plantData[index].nickname;
        id("watered-date").value = plantData[index].wateredDate;
      } else {
        id("plant-type").value = '';
        id("nickname").value = '';
        id("watered-date").value = '';
      }
    }
  
    function handleConfirm(index, element) {
      const plantType = id("plant-type").value;
      const nickname = id("nickname").value;
      const wateredDate = id("watered-date").value;
  
      plantData[index] = {
        type: plantType,
        nickname: nickname,
        wateredDate: wateredDate
      };
  
      id("popup").classList.add("hidden");
  
      if (element.tagName.toLowerCase() === 'button') {
        const plantDiv = element.parentElement.nextElementSibling;
        if (plantDiv) {
          const randomImage = getRandomImage();
          plantDiv.querySelector("img").src = `assets/img/${randomImage}`;
          plantDiv.classList.remove("hidden");
        }
  
        element.parentElement.classList.add('hidden');
        totalPlantsAdded++;
      }
    }
  
    function getRandomImage() {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * 8) + 1;
      } while (usedImages.has(randomNumber));
  
      usedImages.add(randomNumber);
      return `${randomNumber}.png`;
    }
  
    function id(idName) {
      return document.getElementById(idName);
    }
  
    function qsa(selector) {
      return document.querySelectorAll(selector);
    }
  })();
  
  document.addEventListener('DOMContentLoaded', () => {
    // Set current date on the calendar icon
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString('en-US', options);
    document.getElementById('current-date').textContent = currentDate;
  
    // Handle calendar pop-up
    const calendarIcon = document.getElementById('calendar-icon');
    const calendarPopup = document.getElementById('calendar-popup');
    const closePopupBtn = document.getElementById('close-popup');
  
    // Open the pop-up when the calendar icon is clicked
    calendarIcon.addEventListener('click', () => {
        console.log("Calendar icon clicked"); // Debugging log
        calendarPopup.classList.remove('hidden'); // Show the pop-up
    });
  
    // Close the pop-up when the close button is clicked
    closePopupBtn.addEventListener('click', () => {
        console.log("Close button clicked"); // Debugging log
        calendarPopup.classList.add('hidden'); // Hide the pop-up
    });
  
    // Close the pop-up when clicking outside the pop-up content
    window.addEventListener('click', (event) => {
        if (event.target === calendarPopup) {
            console.log("Outside pop-up clicked"); // Debugging log
            calendarPopup.classList.add('hidden');
        }
    });
  });
  document.getElementById("calendar-icon").addEventListener("click", function() {
    const popup = document.getElementById("calendar-popup");
    popup.classList.toggle("hidden");  // Show or hide the popup
  });
  
  document.getElementById("close-popup").addEventListener("click", function() {
    const popup = document.getElementById("calendar-popup");
    popup.classList.add("hidden");  // Hide the popup when close is clicked
  });