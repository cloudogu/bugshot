import { converIssueToTemplate } from "./api/convert";
import { connection, template } from "./api/store";
import { BugShot } from "./api/types";
import createRedmineApi from "./api/redmine";

// To make sure we can uniquely identify each screenshot tab, add an id as a
// query param to the url that displays the screenshot.
let id = 100;
const createBugShot = (capturedTab: chrome.tabs.Tab) => {
  chrome.tabs.captureVisibleTab((screenshotUrl) => {
    const viewTabUrl = chrome.extension.getURL("screenshot.html?id=" + id++);
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

      // We fetch all the views opened by our extension using getViews method and
      // it returns an array of the JavaScript 'window' objects for each of the pages
      // running inside the current extension. Inside the loop, we match each and
      // every entry's URL to the unique URL we created at the top and if we get a match,
      // we call a function on that view which will be called on the page that has been opened
      // by our extension and we pass our image URL to the page so that it can display it to the user.
      var views = chrome.extension.getViews();
      for (var i = 0; i < views.length; i++) {
        var view = views[i];
        if (view.location.href == viewTabUrl) {
          let resolution;
          if (capturedTab.width && capturedTab.height) {
            resolution = {
              width: capturedTab.width,
              height: capturedTab.height,
            };
          }

          const bugshot: BugShot = {
            url: capturedTab.url,
            screenshotUrl,
            resolution,
          };

          // @ts-ignore
          view.onBugShot(bugshot);
          break;
        }
      }
    });

    //We open the tab URL by using the chrome tabs create method and passing it the
    // URL that we just created and we save the tab id that we get from this method
    // after the tab is created in the targetId variable.
    chrome.tabs.create({ url: viewTabUrl }, (tab) => {
      targetId = tab.id;
    });
  });
};

const browserActionListener = () => {
  chrome.tabs.query({ active: true }, (tabs) => {
    if (tabs && tabs.length === 1) {
      createBugShot(tabs[0]);
    }
  });
};

const configureListener = () => {
  chrome.browserAction.setPopup({ popup: "" });
  chrome.browserAction.onClicked.removeListener(browserActionListener);
  chrome.browserAction.onClicked.addListener(browserActionListener);
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
      if (tab.url && tab.url.startsWith(`${c.url}/issues`)) {
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
    connection()
      .remove()
      .then(() => {
        chrome.browserAction.setPopup({ popup: "connection.html" });
        const view = chrome.extension
          .getViews()
          .filter((v) => v.location.href.includes("/screenshot.html"))
          .forEach((v) => v.close());
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
