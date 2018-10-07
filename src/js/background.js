// when the active tab is changed
chrome.tabs.onActivated.addListener(activeInfo => {
  Background.cacheActiveTab(activeInfo.tabId);
});

// when a tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (Background.activeTabId === tabId) {
    Background.cacheActiveTab(tabId);
  }
});

// when current window is switched
chrome.windows.onFocusChanged.addListener((windowId) => {
  chrome.windows.getCurrent({
    populate: true
  }, window => {
    window.tabs.forEach(tab => {
      if (tab.active) {
        Background.cacheActiveTab(tab.id);
      }
    });
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse({
    tabId: Background.activeTabId,
    tabUrl: Background.activeTabUrl,
    tabTitle: Background.activeTabTitle
  });
});

const Background = {
  activeTabId: 0,
  activeTabUrl: '',
  activeTabTitle: '',
  cacheActiveTab: tabId => {
    Background.activeTabId = tabId;
    chrome.tabs.get(tabId, tab => {
      Background.activeTabUrl = tab.url;
      Background.activeTabTitle = tab.title;
    });
  }
};
