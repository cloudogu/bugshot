const logout = () => {
  chrome.runtime.sendMessage({
    type: "logout",
  });
  chrome.tabs.getCurrent((tab) => {
    if (tab?.id) {
      chrome.tabs.remove(tab.id);
    }
  });
};

export default logout;
