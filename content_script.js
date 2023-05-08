chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'export_friends') {
    const friends = [];
      const friendCards = document.querySelectorAll(
        "div.x6s0dn4.x1lq5wgf.xgqcy7u.x30kzoy.x9jhf4c.x1olyfxc.x9f619.x78zum5.x1e56ztr.xyamay9.x1pi30zi.x1l90r2v.x1swvt13.x1gefphp"
      );
      friendCards.forEach((card) => {
        let name, photo, profileLink
        try {
            name =
            card.querySelector('a span[dir="auto"]').innerText;
            photo = card.querySelector("img").src;
            profileLink = card.querySelector("a").href;
        } catch (error) {
            // console.log("card: ", card);   
            // console.log(error)
            return
        }

      friends.push({ name, photo, profileLink });
    });
      
      console.log(friends);

    const csvContent = 'Name,Photo,ProfileLink\n' + friends.map((friend) => `${friend.name},${friend.photo},${friend.profileLink}`).join('\n');
    const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = csvUrl;
    downloadLink.download = 'facebook_friends.csv';
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
});

