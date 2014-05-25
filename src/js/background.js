// when the active tab is changed
chrome.tabs.onActivated.addListener(function (activeInfo) {
  Background.cacheActiveTab(activeInfo.tabId);
});

// when a tab is updated
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (Background.activeTabId === tabId) {
    Background.cacheActiveTab(tabId);
  }
});

// when current window is switched
chrome.windows.onFocusChanged.addListener(function (windowId) {
  chrome.windows.getCurrent({
    populate: true
  }, function (window) {
    window.tabs.forEach(function (tab) {
      if (tab.active) {
        Background.cacheActiveTab(tab.id);
      }
    });
  });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  sendResponse({
    tabId: Background.activeTabId,
    tabUrl: Background.activeTabUrl,
    tabTitle: Background.activeTabTitle
  });
});

var Background = {
  activeTabId: 0,
  activeTabUrl: '',
  activeTabTitle: '',
  cacheActiveTab: function (tabId) {
    Background.activeTabId = tabId;
    chrome.tabs.get(tabId, function (tab) {
      Background.activeTabUrl = tab.url;
      Background.activeTabTitle = tab.title;
    });
  }
};