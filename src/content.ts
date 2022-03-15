/* eslint-disable no-alert */

function addTemplate() {
  const name = prompt("Please enter the name for the BugShot Template:", "Default");

  // send message with link and insert name to background script
  chrome.runtime.sendMessage({
    name,
    url: window.location.origin + window.location.pathname,
  });
}

function createBaseLink() {
  const link = document.createElement("a");
  link.classList.add("icon");
  link.id = "add_as_bugshot_template";
  link.rel = "nofollow";
  link.title = "Add as BugShot template";
  link.href = "#";
  return link;
}

function createRedmineBugShotLink(menu: Element) {
  const link = createBaseLink();
  link.classList.add("icon-copy");
  link.textContent = "BugShot";
  link.onclick = () => {
    // close menu
    menu.classList.remove("expanded");
    addTemplate();
    return false;
  };

  return link;
}

function createEasyRedmineBugShotLink() {
  const link = createBaseLink();
  link.style.setProperty("background-image", "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjAuMywgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9ImJ1Z1Nob3RTcXVhcmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIKCSB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxNDUgMTQ1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNDUgMTQ1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I2FlMTQwMDt9Cjwvc3R5bGU+CjxwYXRoIGlkPSJidWciIGNsYXNzPSJzdDAiIGQ9Ik0xMjYsODMuNGMwLjEtMS4yLTAuMy0yLjUtMS4yLTMuNGMtMC45LTEtMi41LTIuNi0xNi45LTIuM2MtMC43LTIuNi0xLjctNS4xLTMuMS03LjVsLTIuMy0zLjkKCWMxLjktMi4yLDQtNC41LDUuNC02YzMsMi43LDcuOSw2LjUsMTEuOCw3LjZjMi4xLDAuNiw0LjItMC43LDQuOC0yLjhjMC42LTIuMS0wLjctNC4yLTIuOC00LjhjLTMuMi0wLjgtOS40LTYuMy0xMC41LTcuNQoJYy0wLjgtMC45LTEuOS0xLjUtMy4xLTEuNWMtMS41LDAtMi45LDAtOS44LDcuOUw5Ni42LDU2Yy0wLjktMS42LTItMy4xLTMuMi00LjVjMi4yLTIuMyw0LTQuOSw1LjUtNy43YzEuNS0zLjIsMC42LTYuNi0wLjItOS4yCgljLTAuMy0xLTAuNi0yLjEtMC42LTMuMWMwLjctMi0wLjMtNC4zLTIuMy01Yy0xLjktMC43LTQsMC4yLTQuOSwyYy0xLjIsMi44LTAuNCw1LjcsMC4zLDguMmMwLjQsMS4zLDAuOSwzLjMsMC42LDQKCWMtMS4yLDIuMS0yLjcsNC4xLTQuNCw1LjhjLTIuNi0xLjctNS40LTMtOC40LTMuN2MtMS0wLjMtMi0wLjUtMy4xLTAuNmMwLjItMy0wLjUtNi4xLTIuMS04LjdsMCwwYy0yLjctNC40LTcuMy03LjItMTIuNC03LjgKCWwyLjMtOS45YzAuNS0yLjEtMC45LTQuMi0zLTQuNmMtMi4xLTAuNC00LjEsMC44LTQuNiwyLjlsLTIuOCwxMi4xYy0yLjMsMC42LTQuNSwxLjQtNi41LDIuNmMtMS44LDEuMS0zLjQsMi4zLTQuOSwzLjhsLTExLjgtNAoJYy0yLTAuOC00LjMsMC4zLTUsMi4zczAuMyw0LjMsMi4zLDVjMC4xLDAsMC4yLDAuMSwwLjIsMC4xbDkuOCwzLjNjLTIuMiw1LjEtMi4zLDEwLjcsMC40LDE1LjNjMS40LDIuMywzLjMsNC4yLDUuNyw1LjYKCWMtMS43LDMuOC0yLjYsNy45LTIuNSwxMi4xYy0yLjMsMC41LTQuNywwLjYtNywwLjZjLTAuNy0wLjEtMi4xLTEuNi0zLTIuNmMtMS44LTEuOS0zLjgtNC4xLTYuOC00LjZjLTIuMS0wLjMtNC4xLDEuMS00LjUsMy4yCgljLTAuMywyLjEsMS4xLDQuMSwzLjIsNC40SDIzYzAuOSwwLjYsMS43LDEuNCwyLjQsMi4yYzEuOSwyLDQuMiw0LjYsNy44LDVjMC42LDAuMSwxLjMsMC4xLDEuOSwwLjFjMi40LTAuMSw0LjgtMC4zLDcuMi0wLjcKCWMwLjcsMi4yLDEuNiw0LjQsMi44LDYuNGwxLjEsMS45Yy0xMC4yLDEuOC0xMC45LDMtMTEuNyw0LjJjLTAuNiwxLTAuOCwyLjMtMC40LDMuNGMwLjUsMS42LDEuOCw5LjgsMC45LDEyLjkKCWMtMC42LDIuMSwwLjYsNC4yLDIuNiw0LjhjMC40LDAuMSwwLjcsMC4yLDEuMSwwLjJjMS43LDAsMy4yLTEuMSwzLjctMi44YzEuMi0zLjksMC41LTEwLjEtMC4yLTE0LjFjMi4xLTAuNSw1LjItMSw4LjEtMS41bDIuOSw1CgljMS4xLDEuOSwyLjUsMy43LDQsNS4zYy04LDEyLjQtNy41LDE0LjUtNy4xLDE1LjljMC4zLDEuMiwxLjEsMi4yLDIuMiwyLjdjMy40LDEuNSw2LjgsMi43LDEwLjQsMy44YzMuMiwxLDguNCwyLjYsMTAuMSwzLjgKCWMwLjQsMS40LDEuNSwyLjUsMywyLjhjMC4zLDAuMSwwLjUsMC4xLDAuOCwwLjFjMS44LDAsMy40LTEuMywzLjgtMy4xYzEuMi01LjgtNi4xLTguMS0xNS40LTExYy0yLjItMC43LTQuNS0xLjQtNi40LTIuMQoJYzEtMiwyLjgtNSw0LjctNy45YzQuNSwyLjcsOS42LDQuMSwxNC45LDQuMWM1LjEsMCwxMC4xLTEuNCwxNC42LTRsMS44LTFjNi42LTMuOSwxMS40LTEwLjIsMTMuMy0xNy42YzAuNi0yLjIsMC45LTQuNCwwLjktNi42CgljMy40LDAsNi43LDAsOC45LDAuMmMtMC40LDItMSw0LjMtMS42LDYuNmMtMi40LDkuNC00LjMsMTYuOSwxLjMsMTguOWMwLjQsMC4yLDAuOSwwLjIsMS4zLDAuMmMyLjEsMCwzLjktMS43LDMuOS0zLjkKCWMwLTEtMC40LTItMS4xLTIuN2MwLTIuMSwxLjMtNy4zLDIuMi0xMC42QzEyNC43LDkwLjYsMTI1LjUsODcsMTI2LDgzLjR6Ii8+CjxnIGlkPSJzdWNoZXIiPgoJPGc+CgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEuMiwxMHYzNC44aDYuM1YxMGMwLjEtMS40LDEuMi0yLjUsMi42LTIuNmgzNC44VjEuMUgxMC4xQzUuMiwxLjEsMS4yLDUuMSwxLjIsMTB6IE0xMzQuOSwxLjFoLTM0Ljh2Ni4zCgkJCWgzNC44YzEuNCwwLjEsMi41LDEuMiwyLjYsMi42djM0LjhoNi4zVjEwQzE0My44LDUuMSwxMzkuOCwxLjEsMTM0LjksMS4xeiBNMTM3LjUsMTM0LjhjMCwxLjQtMS4yLDIuNi0yLjYsMi42aC0zNC44djYuM2gzNC44CgkJCWM0LjksMCw4LjktNCw4LjktOC45VjEwMGgtNi4zTDEzNy41LDEzNC44TDEzNy41LDEzNC44eiBNNy41LDEzNC44VjEwMEgxLjJ2MzQuOGMwLDQuOSw0LDguOSw4LjksOC45aDM0Ljh2LTYuM0gxMC4xCgkJCUM4LjcsMTM3LjQsNy42LDEzNi4yLDcuNSwxMzQuOHoiLz4KCTwvZz4KPC9nPgo8L3N2Zz4K')", "important")
  link.style.marginLeft = "12px";
  link.style.right = "0";
  link.style.order = "3";
  link.style.width = "0.9em"
  link.style.height = "0.9em"
  link.onclick = () => {
    addTemplate();
    return false;
  };

  return link;
}


function addBugShotLink() {
  const link = document.querySelector("#add_as_bugshot_template");
  if (link) {
    // bugshot link is already available, exit
    return;
  }

  // for redmine
  const menu = document.querySelector(".contextual .drdn");
  if (menu) {
    const items = menu.querySelector(".drdn-items");
    if (items) {
      const createLink = createRedmineBugShotLink(menu);
      items.appendChild(createLink);
    }
  }

  // for EasyRedmine
  const easyMenu = document.querySelector(".easy-panel-handler-container");
  if (easyMenu) {
    const createLink = createEasyRedmineBugShotLink();
    easyMenu.append(createLink)
  }
}

// receive event from service worker
chrome.runtime.onMessage.addListener((request) => {
  if (request.type === "bugshot_url") {
    addBugShotLink();
  }
});

// mark as module
export {}
