(function() {
  "use strict";

  window.addEventListener("load", init);

  function init() {
    qsa(".plus-button").forEach(button => {
      button.addEventListener("click", function() {
        addPlant(button);
      });
    });
  }

  function addPlant(button) {
    // button.style.display = 'none';
    button.classList.add('hidden');
    const plantDiv = button.nextElementSibling;
    if (plantDiv) {
      plantDiv.classList.remove('hidden');
    }
  }



    /* ------------------------------ Helper Functions  ------------------------------ */
  // Note: You may use these in your code, but do remember that your code should not have
  // any functions defined that are unused.

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) { // less common, but you may find it helpful
    return document.querySelector(selector);
  }

  /**
   * Returns all the element that matches the given css selector.
   * @param  {string} selector - CSS query selector.
   * @return {object} All DOM object matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Displays the error message when the fetch did not pass successfully.
   */
  function displayError() {
    id("error-text").innerText = "Something went wrong with the Saving request. Please try again later.";
    id("error-text").classList.remove("hidden");
  }

})();