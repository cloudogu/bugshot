const logout = () => {
  chrome.runtime.sendMessage({
    type: "logout",
  });
  chrome.tabs.getCurrent((tab) => {
    if (tab?.id) {
      chrome.tabs.remove(tab.id);
    } else {
      window.close();
    }
  });
};

export default logout;
