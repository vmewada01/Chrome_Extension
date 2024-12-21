document.addEventListener("DOMContentLoaded", () => {
  const inputElement = document.getElementById("email");
  console.log("input Element", inputElement);
  if (inputElement) {
    inputElement.addEventListener("input", () => {
      console.log("Input value changed:", currentValue); // Log to console for debugging
      chrome.runtime.sendMessage({ action: "getInputText" }, (response) => {
        console.log("Response from background:", response.value);
      });
    });
  }
});
