GoogleAnalytics && (GoogleAnalytics.retention = (function () {
	const DAYS = "Retained {{numOfDays}}";
	const TYPE = "General";

	class RetentionEvent {
		constructor() {
			this.lastRetentionDay = 28;
			this.minHoursFromInstall = 8;

			let data = JSON.parse(localStorage.getItem('retentionEvent')) || {sentDays: {}, completed: false};

			this.sentDays = data.sentDays;
			this.completed = data.completed;

			localStorage.setItem('retentionEvent', JSON.stringify(data));
		}

		start() {
			this.report.bind(this)();
		}

		fire(numOfDays) {
			let days = DAYS.replace("{{numOfDays}}", numOfDays);
			let type = TYPE;
			let version = (chrome || browser).runtime.getManifest().version;

			GoogleAnalytics && GoogleAnalytics.trackEvent(type, days, version, numOfDays);
		}

		getFirstRunDate() {
			return +localStorage.getItem('firstRunDate');
		}

		report() {
			if (!this.completed) {
				setTimeout(this.report.bind(this), 1000 * 60 * 60);

				let now = new Date();
				let firstRunDate;
				if (!this.getFirstRunDate()) {
					return;
				} else {
					firstRunDate = new Date(this.getFirstRunDate());
				}
				// console.log(firstRunDate);

				let installStart = this.getDateStart(firstRunDate);
				// console.log(installStart);

				let todayStart = this.getDateStart(now);
				// console.log(todayStart);

				let msStartDiff = Math.abs(todayStart - installStart);
				// console.log(msStartDiff);

				let hoursFromTrueInstall = Math.floor((now - firstRunDate) / (1000 * 60 * 60));
				// console.log(hoursFromTrueInstall);
				let daysDiff = Math.floor(msStartDiff / (1000 * 60 * 60 * 24));
				// console.log(daysDiff);

				let data = JSON.parse(localStorage.getItem('retentionEvent')) || {sentDays: {}, completed: false};

				if (daysDiff > 0 && daysDiff <= this.lastRetentionDay) {
					if (!this.sentDays[daysDiff] && hoursFromTrueInstall > this.minHoursFromInstall) {
						this.fire(daysDiff);
						this.sentDays[daysDiff] = true;

						data.sentDays = this.sentDays;
						localStorage.setItem('retentionEvent', JSON.stringify(data));
					}
				} else if (daysDiff > this.lastRetentionDay) {
					data.sentDays = this.sentDays;
					data.completed = true;
					localStorage.setItem('retentionEvent', JSON.stringify(data));
				}
			}
		}

		getDateStart(date) {
			return new Date(date.getFullYear(), date.getMonth(), (date.getHours() >= 0 && date.getHours() < 5) ? date.getDate() - 1 : date.getDate(), 5, 0, 1);
		}
	}

	return new RetentionEvent();
})());
