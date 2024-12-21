document.addEventListener("DOMContentLoaded", () => {
  const inputBox = document.getElementById("inputBox");
  const submitBtn = document.getElementById("submitBtn");
  const responseDisplay = document.getElementById("response");

  // Request the current value of the input from content.js
  chrome.runtime.sendMessage({ action: "getInputText" }, (response) => {
    if (response.value) {
      inputBox.value = response.value; // Set the input value from content.js to popup input box
      console.log("Input field value fetched from content.js:", response.value);
    }
  });

  // Enable button when there's input
  inputBox &&
    inputBox.addEventListener("input", () => {
      submitBtn.disabled = !inputBox.value.trim();
    });

  // API Call
  submitBtn.addEventListener("click", async () => {
    const inputValue = inputBox.value.trim();
    if (inputValue) {
      alert("API calling");
      try {
        const response = await fetch("https://your-api-endpoint.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value: inputValue }),
        });
        const data = await response.json();
        responseDisplay.textContent = `Response: ${data.message}`;
      } catch (error) {
        responseDisplay.textContent = "Error calling API!";
      }
    }
  });
});
