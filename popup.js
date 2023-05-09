document.getElementById('export').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'export_friends' });
  });
});

document.getElementById("start").addEventListener("click", () => {
  chrome.tabs.executeScript({
    code: `
        window.autoScrollInterval = setInterval(() => {
        const dialogElement = document.querySelector("div._aano");
        // 檢查元素是否存在，以防找不到匹配的元素
        if (dialogElement) {
            // 滾動到對話框的底部
            dialogElement.scrollTop = dialogElement.scrollHeight;

            // 或者，滾動指定的像素數
            // dialogElement.scrollTop += 100;
        } else {
            console.log("Dialog element not found.");
        }
        }, 1000);
      `,
  });
});

document.getElementById("stop").addEventListener("click", () => {
  chrome.tabs.executeScript({
    code: "clearInterval(window.autoScrollInterval);",
  });
});
