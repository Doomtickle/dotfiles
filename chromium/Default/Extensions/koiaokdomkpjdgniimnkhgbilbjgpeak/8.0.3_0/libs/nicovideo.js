if (REGEXP.nicovideo.test(location.href)) {

	function downloadButton() {
		function init() {
			if (window && document.querySelector('.MainContainer-player .PlayerContainer')) {
				try {
					let filename = videoId.replace(/[<>:"\/\\|?*]/g, '') + '.mp4',
						button = document.getElementById(buttonId);

					button.href = downloadUrl;
					button.target = '_blank';
					button.download = filename;
					return button;
				}
				catch (error) {
					console.error(error);
				}
			}
			else {
				setTimeout(init, 100);
			}
		}

		init();
	}

	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		let videoId = location.href.substr(location.href.lastIndexOf('/') + 1);
		if (!request.data && videoId) {
			sendResponse(videoId);
		} else if (videoId) {
			function processButton() {
				if (document.body && document.readyState === 'complete') {
					addButton(request.pattern, (button) => {
						let script = buildScript([
							{
								type: 'string', name: 'buttonId', data: button.id
							}, {
								type: 'object', name: 'downloadUrl', data: request.data.url
							}, {
								type: 'string', name: 'videoId', videoId
							}, {
								type: 'function', exec: true, data: downloadButton
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
}