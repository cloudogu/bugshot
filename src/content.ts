function addBugShotLink() {
  const link = document.querySelector("#add_as_bugshot_template");
  if (link) {
    // bugshot link is alredy available, exit
    return;
  }

  const menu = document.querySelector(".contextual .drdn");
  if (menu) {
    const items = menu.querySelector(".drdn-items");
    if (items) {
      const link = createBugShotLink(menu);
      items.appendChild(link);
    }
  }
}

function createBugShotLink(menu: Element) {
  const link = document.createElement("a");
  link.classList.add("icon");
  link.classList.add("icon-copy");
  link.id = "add_as_bugshot_template";
  link.rel = "nofollow";
  link.title = "Add as BugShot template";
  link.textContent = "BugShot";
  link.href = "#";
  link.onclick = function () {
    // close menu
    menu.classList.remove("expanded");

    const name = prompt("Please enter the name for the BugShot Template:", "Default");

    // send message with link and insert name to background script
    chrome.runtime.sendMessage({
      name,
      url: window.location.origin + window.location.pathname,
    });

    return false;
  };

  return link;
}

chrome.runtime.onMessage.addListener(function (request) {
  if (request.type === "bugshot_url") {
    addBugShotLink();
  }
});
