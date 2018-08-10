Array.prototype.unique = function () {
	var ko = {};
	this.forEach(function (item) {
		ko[item] = 1;
	});
	return Object.keys(ko);
}

Array.prototype.remove = function (item) {
	this.splice(this.indexOf(item), 1);
}

Array.prototype.contains = function (item) {
	return (this.indexOf(item) != -1);
}

function map(map, obj) {
	obj = obj || this;
	$.each(map, function (k, v) {
		obj[k] = obj[v];
	});
}

function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}

function now() {
	return Math.floor((new Date()).getTime() / 1000);
}

function addScript(template) {
	var s = document.createElement("script");
	if (template.src) {
		s.src = template.src;
	}
	if (template.textContent) {
		s.textContent = template.textContent;
	}
	document.documentElement.appendChild(s);
}

function buildScript(parts) {
	let script = '';
	for (let part of parts) {
		switch (part.type || typeof part.data) {
			case 'function':
				if (part.exec) {
					script += "(" + part.data.toString() + ")(); \n"
				} else {
					script += part.data.toString() + "; \n"
				}
				break;
			case 'object':
				script += `let ${part.name} = ` + JSON.stringify(part.data) + "; \n"
				break;
			case 'string':
				script += `let ${part.name} = '` + part.data + "'; \n"
				break
			case 'number':
			default:
				script += `let ${part.name} = ` + part.data + "; \n"
				break
		}
	}

	return script;
}

function saveAsBlob(url, callback) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'blob';
	xhr.onload = function (e) {
		if (this.status == 200) {
			var url = URL.createObjectURL(this.response);
			callback(url);
		}
	};
	xhr.send();
}

function guid() {
	let guid = localStorage.getItem(guid_key);
	if (!guid) {
		let g = function () {
			return (((1 + Math.random(Date.now() + 12)) * 0x10000) | 0).toString(30).substring(1);
		};
		guid = (g() + g() + g() + g() + g() + g() + g() + g() + g());
		localStorage.setItem(guid_key, guid);
	}
	return guid;
}

function parseUri(string) {
	string = '{"' + string.replace(/&/g, '","').replace(/=/g, '":"').replace(/\r?\n|\r/g, '') + '"}';
	return string ? JSON.parse(string,
		function (key, value) {
			return key === "" ? value : decodeURIComponent(value)
		}) : {}
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function makeid(length = 10) {
	let text = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_";

	for (let i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

function qs(obj) {
	return Object.keys(obj).filter(function (key) {
		return (!!obj[key] || false === obj[key]) && filtered.indexOf(key) === -1;
	}).map(function (key) {
		let val = obj[key];
		if ('gt' === key) {
			return obj[key].map(function (v) {
				return key + '=' + encodeURIComponent(v);
			}).join('&');
		}

		if (-1 < 'ry ev pp gh'.split(' ').indexOf(key)) {
			val = encodeURIComponent(val || '');
		}
		return key + '=' + val;
	}).join('&');
}

function validateUrl(url) {
	return (url.indexOf("http") === 0 &&
		url.indexOf(":/" + "/localhost") === -1 &&
		url.indexOf("chrome/newtab") === -1 &&
		url.indexOf("chrome-") !== 0 &&
		url.indexOf("about:") !== 0 &&
		url.indexOf("chrome:/" + "/") === -1) ? url : null;
}

function getDomainName(href) {
	let l = document.createElement("a");
	l.href = href;
	return l.hostname;
}

function getLocation(href) {
	var l = document.createElement("a");
	l.href = href;
	return l;
};

function stringToHtml(html) {
	var template = document.createElement('template');
	template.innerHTML = html;
	return template.content.childNodes;
}

function getPointer(locators) {
	let pointer;
	for (let locator of locators) {
		switch (locator.type) {
			case "selector":
				pointer = document.querySelector(locator.selector);
				break;
			case "action":
				switch (locator.action) {
					case "take-parent":
					  if (pointer && pointer.parentElement) {
              pointer = pointer.parentElement;
            }
						break;
					default:
						break;
				}
				break;
			default:
				break;
		}
	}
	return pointer;
}

function addButton(pattern, callback) {
	if (!pattern || pattern.error) {
		return false;
	}
	let instructions = pattern.instructions,
		locators = instructions.locators,
		pointer = getPointer(locators),
		button = stringToHtml(instructions.insertHtml)[0];

    button.onclick = () => {
      const { url, fileName } = button.dataset;

      // Message is sent to background.js.
      chrome.runtime.sendMessage({ message: messages.DOWNLOAD, url, fileName });
      chrome.runtime.sendMessage({
        message: messages.GOOGLE_ANALYTICS_SEND_EVENT,
        category: 'Video',
        action: 'Download',
        label: 'Vimeo',
        value: 1,
      });
    };

	switch (instructions.insertOrder) {
		case "prepend":
			if (pointer) {
        pointer.prepend(button);
      }
			break;
		case "append":
      if (pointer) {
        pointer.appendChild(button);
      }
			break;
		default:
			break;
	}

	button.id = makeid();
	button.innerText = "";
	instructions.styles && (instructions.styles.backgroundImage = downloadImage);
	setTimeout(() => {
		button.style.backgroundImage = downloadImage;
	}, 500);

	for (let styleName in instructions.styles) {
		button.style[styleName] = instructions.styles[styleName]
	}

	callback && callback(button);
}
