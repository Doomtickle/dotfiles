chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (REGEXP.nicovideo.test(location.href) && !window.videoId) {
		window.videoId = location.href.substr(location.href.lastIndexOf('/') + 1);
		if (!request.data && window.videoId) {
			sendResponse(window.videoId);
		}
	} else if (request.pattern.instructions) {
		function processButton() {
			if (document.body && document.readyState === 'complete') {
				addButton(request.pattern, (button) => {
					let script = buildScript([
						{
							type: 'string', name: 'buttonId', data: button.id
						}, {
							type: 'object', name: 'downloadUrl', data: request.pattern.instructions.downloadUrl
						}, {
							type: 'string', name: 'videoId', data: window.videoId || ''
						}, {
							type: 'function', exec: true, data: this[request.pattern.instructions.action] || (()=>{})
						}
					]);
					addScript({textContent: script});
				});
			} else {
				setTimeout(processButton, 100);
			}
		}

		processButton();
	}
});
