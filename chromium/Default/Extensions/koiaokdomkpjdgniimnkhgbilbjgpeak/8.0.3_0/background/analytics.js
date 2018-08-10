class Analytics {
	constructor(tid, cid) {
		this.tid = tid;
		this.cid = cid || this.generateUuidV4();
		this.url = "https://www.google-analytics.com/collect?";
	}

	fire(ec, ea, el, ev) {
		let today = new Date(),
			dd = today.getDate(),
			mm = today.getMonth() + 1,
			yyyy = today.getFullYear();

		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}

		let url = this.buildUrl(this.url, {
			tid: this.tid,
			cid: this.cid,
			v: 1,
			t: 'event',
			ec: ec || '',
			ea: ea || '',
			el: el || '',
			ev: ev || 0,
			cd1: yyyy + '-' + mm + '-' + dd
		});
		this.post(url);
	}

	post(url, params = '', callback = xhr => {
	}) {
		let xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.onload = function () {
			return callback.call(null, xhr);
		};
		xhr.send(params);
	}

	buildUrl(method, params) {
		let string = Object.keys(params).map((key) => {
			return key + '=' + encodeURIComponent(params[key]);
		}).join('&');

		if (method === '') {
			return string;
		} else if (method.indexOf('?') === -1) {
			return method + '?' + string;
		} else {
			return method + string;
		}
	}

	generateUuidV4() {
		let ts = Date.now();
		if (window.performance && window.performance.now) {
			ts += performance.now();
		}

		let str = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
		let uuid = str.replace(/[xy]/g, function (c) {
			let r = (ts + Math.random() * 16) % 16 | 0;
			ts = Math.floor(ts / 16);

			return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});

		return uuid;
	}
}