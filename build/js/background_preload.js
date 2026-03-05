(function() {
  var initContextMenu, _ref;

  if (!globalThis.window) {
    globalThis.window = globalThis;
    globalThis.global = globalThis;
  }

  window.UglifyJS_NoUnsafeEval = true;

  globalThis.zeroDetectModeCB = null;

  globalThis.startupCheck = void 0;

  initContextMenu = function() {
    if (!chrome.contextMenus) {
      return;
    }
    chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
      id: 'enableQuickSwitch',
      title: chrome.i18n.getMessage('contextMenu_enableQuickSwitch'),
      type: 'checkbox',
      checked: false,
      contexts: ["action"]
    });
    chrome.contextMenus.create({
      id: 'reportIssue',
      title: chrome.i18n.getMessage('popup_reportIssues'),
      contexts: ["action"]
    });
    chrome.contextMenus.create({
      id: 'reload',
      title: chrome.i18n.getMessage('popup_Reload'),
      contexts: ["action"]
    });
    if (!!globalThis.localStorage) {
      return chrome.contextMenus.create({
        id: 'options',
        title: chrome.i18n.getMessage('popup_showOptions'),
        contexts: ["action"]
      });
    }
  };

  initContextMenu();

  if ((_ref = chrome.contextMenus) != null) {
    _ref.onClicked.addListener(function(info, tab) {
      switch (info.menuItemId) {
        case 'options':
          return browser.runtime.openOptionsPage();
        case 'reload':
          return chrome.runtime.reload();
        case 'reportIssue':
          return OmegaDebug.reportIssue();
      }
    });
  }

}).call(this);
