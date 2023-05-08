document.getElementById('export').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'export_friends' });
  });
});

document.getElementById("start").addEventListener("click", () => {
  chrome.tabs.executeScript({
    code: "window.autoScrollInterval = setInterval(() => { window.scrollTo(0, document.body.scrollHeight); }, 1000);",
  });
});

document.getElementById("stop").addEventListener("click", () => {
  chrome.tabs.executeScript({
    code: "clearInterval(window.autoScrollInterval);",
  });
});
