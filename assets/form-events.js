// ==========================================================================
// CORE SUBMIT VALIDATOR & EMAIL STRUCTURAL ALIGNMENT CHECKS
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const formElement = document.querySelector("form");

  if (formElement) {
    formElement.addEventListener("submit", (event) => {
      const firstNameEl = document.getElementById("firstName");
      const lastNameEl = document.getElementById("lastName");
      const emailEl = document.getElementById("email");

      // Boundary check to make sure these elements exist on the active layout canvas page
      if (!firstNameEl || !lastNameEl || !emailEl) return;

      const firstName = firstNameEl.value.trim();
      const lastName = lastNameEl.value.trim();
      const email = emailEl.value.trim();

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (firstName === "" || lastName === "" || email === "") {
        event.preventDefault(); 
        alert("Please fill out all mandatory fields: First Name, Last Name, and Email Address.");
        return;
      }

      if (!emailPattern.test(email)) {
        event.preventDefault(); 
        alert("Please enter a valid email address structure (e.g., name@company.com).");
        return;
      }
    });
  }
});

// ==========================================================================
// CENTRALIZED LIVE MESSAGE FIELD DATA CHARACTER LIMIT MONITOR
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const messageArea = document.getElementById("message");
  const charCounter = document.getElementById("charCounter");

  if (messageArea && charCounter) {
    messageArea.addEventListener("input", () => {
      const maxLength = parseInt(messageArea.getAttribute("maxlength"), 10) || 1000;
      const currentLength = messageArea.value.length;
      const remaining = maxLength - currentLength;

      charCounter.textContent = `${remaining} characters remaining`;

      // Turns red on low character limits boundary warning threshold (< 50)
      if (remaining < 50) {
        charCounter.style.color = "#ef4444";
      } else {
        charCounter.style.color = "#6b7280";
      }
    });
  }
});