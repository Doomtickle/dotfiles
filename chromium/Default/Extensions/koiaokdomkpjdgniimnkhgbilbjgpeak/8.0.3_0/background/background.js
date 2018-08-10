GoogleAnalytics.tid = "UA-109301809-2";
GoogleAnalytics.retention.start();
// GoogleAnalytics.trackEvent("General", "Started", version);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (tab.url.indexOf("youtube.com/watch") > 0 && changeInfo.status === "complete") {
		// GoogleAnalytics.trackEvent("General", "VideoPlay", version);
		chrome.storage.sync.get((settings) => {
			let quality = settings.quality ? settings.quality : "auto",
				size = settings.size ? settings.size : "1";
			GoogleAnalytics.trackEvent("Usage", "Watch YouTube", quality + ' + ' + (size === 1 ? 'large' : 'small'));
		});
	}
});

chrome.runtime.setUninstallURL(uninstallUrl);

if (localStorage.ytSize) {
	let settings = {};
	settings.size = localStorage.ytSize || "1";
	settings.quality = localStorage.ytQuality || "auto";

	chrome.storage.sync.set(settings);
	localStorage.removeItem("ytSize");
	localStorage.removeItem("ytQuality");
}

if (localStorage.base_st) {
	localStorage.removeItem("base_st");
}

if (!localStorage.getItem('firstRunDate')) {
	recepies_loader.optin();
	GoogleAnalytics.trackEvent("General", "Installed", version);
	localStorage.setItem('firstRunDate', JSON.stringify(+new Date()));
}

/**
 * To be synced with player size changed outer
 */
chrome.cookies.onChanged.addListener(({ removed, cookie, cause }) => {
  const WIDE_COOKIE_NAME = 'wide';

  if (cookie.name === WIDE_COOKIE_NAME && cause === 'explicit' && !removed) {
    handlePlayerSizeChange(cookie.value);
  }
});

/**
 * Chrome.store has to be synced with cookie
 *
 * @param {string} size
 */
function handlePlayerSizeChange(size) {
  chrome.storage.sync.get('size', ({ size: storedSize }) => {
    if (chrome.runtime.lastError || storedSize === size) return;

    chrome.storage.sync.set({ size });
  });
}

/**
 * @see VideoService.captureVisibleTab()
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.message) {
    case messages.CAPTURE_VISIBLE_TAB:
      chrome.tabs.captureVisibleTab(null, { format: 'png' }, (imageDataUrl) => {
        sendResponse(imageDataUrl);
      });
      break;

    case messages.DOWNLOAD:
      if (request.url) {
        const a = document.createElement('a');

        const fileExtension = request.url.split('.').pop();
        a.download = request.fileName || `download${fileExtension ? `.${fileExtension}` : ''}`;
        a.href = request.url;
        a.target = '_blank';
        document.documentElement.appendChild(a);
        a.click();
        a.remove();
      }
      break;

    case messages.GOOGLE_ANALYTICS_SEND_EVENT:
      const { category, action, label, value } = request;
      GoogleAnalytics.trackEvent(category, action, label, value);
      break;

    default:
      break;
  }

  return true;
});

chrome.runtime.onInstalled.addListener((details) => {
  const popupNotificationKey = 'notification_viewed';
  const version = chrome.runtime.getManifest().version;

  try {
    if (localStorage.getItem(popupNotificationKey) === null) {
      localStorage.setItem(popupNotificationKey, JSON.stringify(false));
    }
  } catch (e) {
    // Fail silently.
  }

  switch (details.reason) {
    case 'install':
      GoogleAnalytics.trackEvent('General', 'Installed', version);
      if (recepies_loader) {
        recepies_loader.optin();
      }

      try {
        const installDate = +new Date();
        localStorage.setItem('firstRunDate', JSON.stringify(installDate));
        chrome.storage.sync.set({installDate, 'userSawForm': false, 'userInteractionTypeform': false});
      } catch (e) {
        GoogleAnalytics.trackEvent('Error', 'Start', 'Retention');
      }
      chrome.tabs.create({ url: installUrl });

      try {
        localStorage.setItem(popupNotificationKey, JSON.stringify(true));
      } catch (e) {
        // Fail silently.
      }
      break;

    case 'update':
      if (details.previousVersion !== version) {
        GoogleAnalytics.trackEvent('General', 'Updated', version);
      }

      // Set installDate and userSawForm in Chrome storage if not set.
      const installDateLocalStorage = localStorage.getItem('firstRunDate');
      chrome.storage.sync.get(['installDate', 'userSawForm'], (items) => {
        if (installDateLocalStorage && !items.installDate) {
          chrome.storage.sync.set({'installDate': installDateLocalStorage});
        }

        if (!items.userSawForm) {
          chrome.storage.sync.set({'userSawForm': false, 'userInteractionTypeform': false});
        }
      });
      break;

    default:
      break;
  }
});
