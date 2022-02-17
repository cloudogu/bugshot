import { converIssueToTemplate } from "./api/convert";
import { connection, template } from "./api/store";
import createRedmineApi from "./api/redmine";
import { BugShotMessage } from "api/types";

// To make sure we can uniquely identify each screenshot tab, add an id as a
// query param to the url that displays the screenshot.
let id = 100;
const createBugShot = (capturedTab: chrome.tabs.Tab) => {
  chrome.tabs.captureVisibleTab((screenshotUrl) => {
    const viewTabUrl = chrome.runtime.getURL("screenshot.html?id=" + id++);
    let targetId: number | undefined = undefined;

    chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
      // We are waiting for the tab we opened to finish loading.
      // Check that the tab's id matches the tab we opened,
      // and that the tab is done loading.
      if (tabId != targetId || changedProps.status != "complete") {
        return;
      }
      // As we cleared the check above, There is nothing we need to do for
      // future onUpdated events, so we use removeListner to stop getting called
      // when onUpdated events fire.
      chrome.tabs.onUpdated.removeListener(listener);

      let resolution;
      if (capturedTab.width && capturedTab.height) {
        resolution = {
          width: capturedTab.width,
          height: capturedTab.height,
        };
      }

      const message: BugShotMessage = {
        type: "BugShot",
        bugShot: {
          url: capturedTab.url,
          screenshotUrl,
          resolution: resolution,
        },
      };

      chrome.runtime.sendMessage(message);
    });

    //We open the tab URL by using the chrome tabs create method and passing it the
    // URL that we just created and we save the tab id that we get from this method
    // after the tab is created in the targetId variable.
    chrome.tabs.create({ url: viewTabUrl }, (tab) => {
      targetId = tab.id;
    });
  });
};

const actionListener = () => {
  chrome.tabs.query(
    { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
    (tabs) => {
      if (tabs && tabs.length === 1) {
        createBugShot(tabs[0]);
      }
    }
  );
};

const configureListener = () => {
  chrome.action.setPopup({ popup: "" });
  if (!chrome.action.onClicked.hasListener(actionListener)) {
    chrome.action.onClicked.addListener(actionListener);
  }
};

connection()
  .get()
  .then((c) => {
    if (c) {
      configureListener();
    }
  });

chrome.notifications.onButtonClicked.addListener(
  (notifId: string, btnIdx: number) => {
    if (notifId.startsWith("bugshot-") && btnIdx === 0) {
      const url = notifId.replace("bugshot-", "");
      chrome.tabs.create({ url: url });
    }
  }
);

// send message to content script, if the new tab url is the confiured redmine url
chrome.tabs.onUpdated.addListener(function (tabId, _, tab) {
  connection()
    .get()
    .then((c) => {
      if (tab.url && c?.url && tab.url.startsWith(`${c.url}/issues`)) {
        chrome.tabs.sendMessage(tabId, {
          type: "bugshot_url",
        });
      }
    });
});

chrome.runtime.onMessage.addListener(function (msg) {
  if (msg.type === "connection_stored") {
    configureListener();
  } else if (msg.type === "logout") {
    Promise.all([connection().remove(), template().removeAll()]).then(() => {
      chrome.action.setPopup({ popup: "connection.html" });
    });
  } else if (msg.name && msg.url) {
    connection()
      .get()
      .then(createRedmineApi)
      .then((api) => api.issue(`${msg.url}.json`))
      .then(converIssueToTemplate)
      .then((tpl) => template().set(msg.name, tpl));
  }
});
