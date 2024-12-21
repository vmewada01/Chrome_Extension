const website = "https://fkvms.synlabs.io/*";

chrome.action.onClicked.addListener(async (tab) => {
  var notifOptions = {
    type: "basic",
    iconUrl: "icon.png",
    title: "Limit reached!",
    message: "Uh oh, look's like you've reached your alloted limit.",
  };
  chrome.notifications.create("limitNotif", notifOptions);
  if (tab.url.startsWith(website)) {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    alert("ON the target page reached");
    const nextState = prevState === "ON" ? "OFF" : "ON";
    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });
  } else {
    alert("Not on the target page");
  }
});
