chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'export_friends') {
    const friends = [];
    const friendCards = document.querySelectorAll(
      "div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.x2lah0s.x1qughib.x6s0dn4.xozqiw3.x1q0g3np"
    );
    friendCards.forEach((card) => {
      let name, photo, profileLink;
      try {
        const names = card.querySelectorAll(
          "span.x1lliihq.x193iq5w.x6ikm8r.x10wlt62.xlyipyv.xuxw1ft"
        );
        originalName = (names[1]?.innerText || names[0]?.innerText).replace(
          /,/g,
          " "
        );

        // 查找 \n 的位置
        const newlinePosition = originalName.indexOf("\n");
        // 如果找到 \n，則截取從字符串開始到 \n 位置的子字符串
        name =
          newlinePosition !== -1
            ? originalName.substring(0, newlinePosition)
            : originalName;
        if (newlinePosition !== -1) {
          console.log({
            name,
            originalName,
          });
        }
        photo = card.querySelector("img").src;
        profileLink = card.querySelector("a").href;
      } catch (error) {
        return;
      }
      friends.push({ name, photo, profileLink });
    });

    console.log(friends);

    const csvContent =
      "Name,ProfileLink,Photo\n" +
      friends
        .map((friend) => `${friend.name},${friend.profileLink},${friend.photo}`)
        .join("\n");
    const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const csvUrl = URL.createObjectURL(csvBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = csvUrl;
    downloadLink.download = "facebook_friends.csv";
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
});

