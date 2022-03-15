/* eslint-disable no-alert */

function addTemplate() {
  const name = prompt(chrome.i18n.getMessage("promptMessage"), chrome.i18n.getMessage("promptDefaultValue"));

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
  link.title = chrome.i18n.getMessage("externalLinkTitle");
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

/*
 Size optimized version of bugshot icon (static/images/bugshot-icon.svg):
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145 145" style="enable-background:new 0 0 145 145" xml:space="preserve">
   <path fill="#ae1400" d="M126 83.4c.1-1.2-.3-2.5-1.2-3.4-.9-1-2.5-2.6-16.9-2.3-.7-2.6-1.7-5.1-3.1-7.5l-2.3-3.9c1.9-2.2 4-4.5 5.4-6 3 2.7 7.9 6.5 11.8 7.6 2.1.6 4.2-.7 4.8-2.8.6-2.1-.7-4.2-2.8-4.8-3.2-.8-9.4-6.3-10.5-7.5-.8-.9-1.9-1.5-3.1-1.5-1.5 0-2.9 0-9.8 7.9L96.6 56c-.9-1.6-2-3.1-3.2-4.5 2.2-2.3 4-4.9 5.5-7.7 1.5-3.2.6-6.6-.2-9.2-.3-1-.6-2.1-.6-3.1.7-2-.3-4.3-2.3-5-1.9-.7-4 .2-4.9 2-1.2 2.8-.4 5.7.3 8.2.4 1.3.9 3.3.6 4-1.2 2.1-2.7 4.1-4.4 5.8-2.6-1.7-5.4-3-8.4-3.7-1-.3-2-.5-3.1-.6.2-3-.5-6.1-2.1-8.7-2.7-4.4-7.3-7.2-12.4-7.8l2.3-9.9c.5-2.1-.9-4.2-3-4.6-2.1-.4-4.1.8-4.6 2.9l-2.8 12.1c-2.3.6-4.5 1.4-6.5 2.6-1.8 1.1-3.4 2.3-4.9 3.8l-11.8-4c-2-.8-4.3.3-5 2.3s.3 4.3 2.3 5c.1 0 .2.1.2.1l9.8 3.3c-2.2 5.1-2.3 10.7.4 15.3 1.4 2.3 3.3 4.2 5.7 5.6-1.7 3.8-2.6 7.9-2.5 12.1-2.3.5-4.7.6-7 .6-.7-.1-2.1-1.6-3-2.6-1.8-1.9-3.8-4.1-6.8-4.6-2.1-.3-4.1 1.1-4.5 3.2-.3 2.1 1.1 4.1 3.2 4.4h.1c.9.6 1.7 1.4 2.4 2.2 1.9 2 4.2 4.6 7.8 5 .6.1 1.3.1 1.9.1 2.4-.1 4.8-.3 7.2-.7.7 2.2 1.6 4.4 2.8 6.4l1.1 1.9c-10.2 1.8-10.9 3-11.7 4.2-.6 1-.8 2.3-.4 3.4.5 1.6 1.8 9.8.9 12.9-.6 2.1.6 4.2 2.6 4.8.4.1.7.2 1.1.2 1.7 0 3.2-1.1 3.7-2.8 1.2-3.9.5-10.1-.2-14.1 2.1-.5 5.2-1 8.1-1.5l2.9 5c1.1 1.9 2.5 3.7 4 5.3-8 12.4-7.5 14.5-7.1 15.9.3 1.2 1.1 2.2 2.2 2.7 3.4 1.5 6.8 2.7 10.4 3.8 3.2 1 8.4 2.6 10.1 3.8.4 1.4 1.5 2.5 3 2.8.3.1.5.1.8.1 1.8 0 3.4-1.3 3.8-3.1 1.2-5.8-6.1-8.1-15.4-11-2.2-.7-4.5-1.4-6.4-2.1 1-2 2.8-5 4.7-7.9 4.5 2.7 9.6 4.1 14.9 4.1 5.1 0 10.1-1.4 14.6-4l1.8-1c6.6-3.9 11.4-10.2 13.3-17.6.6-2.2.9-4.4.9-6.6 3.4 0 6.7 0 8.9.2-.4 2-1 4.3-1.6 6.6-2.4 9.4-4.3 16.9 1.3 18.9.4.2.9.2 1.3.2 2.1 0 3.9-1.7 3.9-3.9 0-1-.4-2-1.1-2.7 0-2.1 1.3-7.3 2.2-10.6 1-3.6 1.8-7.2 2.3-10.8zM1.2 10v34.8h6.3V10c.1-1.4 1.2-2.5 2.6-2.6h34.8V1.1H10.1c-4.9 0-8.9 4-8.9 8.9zm133.7-8.9h-34.8v6.3h34.8c1.4.1 2.5 1.2 2.6 2.6v34.8h6.3V10c0-4.9-4-8.9-8.9-8.9zm2.6 133.7c0 1.4-1.2 2.6-2.6 2.6h-34.8v6.3h34.8c4.9 0 8.9-4 8.9-8.9V100h-6.3v34.8zm-130 0V100H1.2v34.8c0 4.9 4 8.9 8.9 8.9h34.8v-6.3H10.1c-1.4 0-2.5-1.2-2.6-2.6z"/>
 </svg>
 */
const bugShotIcon =
  "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDUgMTQ1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNDUgMTQ1IiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBmaWxsPSIjYWUxNDAwIiBkPSJNMTI2IDgzLjRjLjEtMS4yLS4zLTIuNS0xLjItMy40LS45LTEtMi41LTIuNi0xNi45LTIuMy0uNy0yLjYtMS43LTUuMS0zLjEtNy41bC0yLjMtMy45YzEuOS0yLjIgNC00LjUgNS40LTYgMyAyLjcgNy45IDYuNSAxMS44IDcuNiAyLjEuNiA0LjItLjcgNC44LTIuOC42LTIuMS0uNy00LjItMi44LTQuOC0zLjItLjgtOS40LTYuMy0xMC41LTcuNS0uOC0uOS0xLjktMS41LTMuMS0xLjUtMS41IDAtMi45IDAtOS44IDcuOUw5Ni42IDU2Yy0uOS0xLjYtMi0zLjEtMy4yLTQuNSAyLjItMi4zIDQtNC45IDUuNS03LjcgMS41LTMuMi42LTYuNi0uMi05LjItLjMtMS0uNi0yLjEtLjYtMy4xLjctMi0uMy00LjMtMi4zLTUtMS45LS43LTQgLjItNC45IDItMS4yIDIuOC0uNCA1LjcuMyA4LjIuNCAxLjMuOSAzLjMuNiA0LTEuMiAyLjEtMi43IDQuMS00LjQgNS44LTIuNi0xLjctNS40LTMtOC40LTMuNy0xLS4zLTItLjUtMy4xLS42LjItMy0uNS02LjEtMi4xLTguNy0yLjctNC40LTcuMy03LjItMTIuNC03LjhsMi4zLTkuOWMuNS0yLjEtLjktNC4yLTMtNC42LTIuMS0uNC00LjEuOC00LjYgMi45bC0yLjggMTIuMWMtMi4zLjYtNC41IDEuNC02LjUgMi42LTEuOCAxLjEtMy40IDIuMy00LjkgMy44bC0xMS44LTRjLTItLjgtNC4zLjMtNSAyLjNzLjMgNC4zIDIuMyA1Yy4xIDAgLjIuMS4yLjFsOS44IDMuM2MtMi4yIDUuMS0yLjMgMTAuNy40IDE1LjMgMS40IDIuMyAzLjMgNC4yIDUuNyA1LjYtMS43IDMuOC0yLjYgNy45LTIuNSAxMi4xLTIuMy41LTQuNy42LTcgLjYtLjctLjEtMi4xLTEuNi0zLTIuNi0xLjgtMS45LTMuOC00LjEtNi44LTQuNi0yLjEtLjMtNC4xIDEuMS00LjUgMy4yLS4zIDIuMSAxLjEgNC4xIDMuMiA0LjRoLjFjLjkuNiAxLjcgMS40IDIuNCAyLjIgMS45IDIgNC4yIDQuNiA3LjggNSAuNi4xIDEuMy4xIDEuOS4xIDIuNC0uMSA0LjgtLjMgNy4yLS43LjcgMi4yIDEuNiA0LjQgMi44IDYuNGwxLjEgMS45Yy0xMC4yIDEuOC0xMC45IDMtMTEuNyA0LjItLjYgMS0uOCAyLjMtLjQgMy40LjUgMS42IDEuOCA5LjguOSAxMi45LS42IDIuMS42IDQuMiAyLjYgNC44LjQuMS43LjIgMS4xLjIgMS43IDAgMy4yLTEuMSAzLjctMi44IDEuMi0zLjkuNS0xMC4xLS4yLTE0LjEgMi4xLS41IDUuMi0xIDguMS0xLjVsMi45IDVjMS4xIDEuOSAyLjUgMy43IDQgNS4zLTggMTIuNC03LjUgMTQuNS03LjEgMTUuOS4zIDEuMiAxLjEgMi4yIDIuMiAyLjcgMy40IDEuNSA2LjggMi43IDEwLjQgMy44IDMuMiAxIDguNCAyLjYgMTAuMSAzLjguNCAxLjQgMS41IDIuNSAzIDIuOC4zLjEuNS4xLjguMSAxLjggMCAzLjQtMS4zIDMuOC0zLjEgMS4yLTUuOC02LjEtOC4xLTE1LjQtMTEtMi4yLS43LTQuNS0xLjQtNi40LTIuMSAxLTIgMi44LTUgNC43LTcuOSA0LjUgMi43IDkuNiA0LjEgMTQuOSA0LjEgNS4xIDAgMTAuMS0xLjQgMTQuNi00bDEuOC0xYzYuNi0zLjkgMTEuNC0xMC4yIDEzLjMtMTcuNi42LTIuMi45LTQuNC45LTYuNiAzLjQgMCA2LjcgMCA4LjkuMi0uNCAyLTEgNC4zLTEuNiA2LjYtMi40IDkuNC00LjMgMTYuOSAxLjMgMTguOS40LjIuOS4yIDEuMy4yIDIuMSAwIDMuOS0xLjcgMy45LTMuOSAwLTEtLjQtMi0xLjEtMi43IDAtMi4xIDEuMy03LjMgMi4yLTEwLjYgMS0zLjYgMS44LTcuMiAyLjMtMTAuOHpNMS4yIDEwdjM0LjhoNi4zVjEwYy4xLTEuNCAxLjItMi41IDIuNi0yLjZoMzQuOFYxLjFIMTAuMWMtNC45IDAtOC45IDQtOC45IDguOXptMTMzLjctOC45aC0zNC44djYuM2gzNC44YzEuNC4xIDIuNSAxLjIgMi42IDIuNnYzNC44aDYuM1YxMGMwLTQuOS00LTguOS04LjktOC45em0yLjYgMTMzLjdjMCAxLjQtMS4yIDIuNi0yLjYgMi42aC0zNC44djYuM2gzNC44YzQuOSAwIDguOS00IDguOS04LjlWMTAwaC02LjN2MzQuOHptLTEzMCAwVjEwMEgxLjJ2MzQuOGMwIDQuOSA0IDguOSA4LjkgOC45aDM0Ljh2LTYuM0gxMC4xYy0xLjQgMC0yLjUtMS4yLTIuNi0yLjZ6Ii8+PC9zdmc+Cg==')";

function createEasyRedmineBugShotLink() {
  const link = createBaseLink();
  link.style.setProperty("background-image", bugShotIcon, "important");
  link.style.marginLeft = "12px";
  link.style.right = "0";
  link.style.order = "3";
  link.style.width = "0.9em";
  link.style.height = "0.9em";
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
  const easyMenu = document.querySelector(".issue-detail-header");
  if (easyMenu) {
    const createLink = createEasyRedmineBugShotLink();
    easyMenu.append(createLink);
  }
}

// receive event from service worker
chrome.runtime.onMessage.addListener((request) => {
  if (request.type === "bugshot_url") {
    addBugShotLink();
  }
});

// mark as module
export {};
