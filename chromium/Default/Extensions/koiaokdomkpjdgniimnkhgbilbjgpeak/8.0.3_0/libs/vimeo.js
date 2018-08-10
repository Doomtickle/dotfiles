if (REGEXP.vimeo.test(location.href)) {

	function downloadButton() {
		function init() {
			if (window && 'vimeo' in window && document.querySelector('.player .video video')) {
				try {
					let videoId = vimeo['clip_page_config']['clip']['id'],
						videoInfo = vimeo['clips'][videoId],
						title = videoInfo['video']['title'],
						streams = videoInfo['request']['files']['progressive'];

					streams.sort((streamA, streamB) => {
						return streamB.width - streamA.width;
					});

					let filename = title.replace(/[<>:"\/\\|?*]/g, '') + '.mp4',
						button = document.getElementById(buttonId);

					button.href = streams[0].url;
					button.target = '_blank';
					button.download = filename;
					button.title = "Download " + streams[0].quality;
					button.innerText = "       " + "Download " + streams[0].quality

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
		function processButton() {
			if (document.body && document.readyState === 'complete') {
				addButton(request.pattern, (button) => {
					let script = buildScript([
						{
							type: 'string', name: 'buttonId', data: button.id
						}, {
							type: 'function', exec: true, data: downloadButton
						}]);

					addScript({textContent: script});
				});
			} else {
				setTimeout(processButton, 100);
			}
		}

		processButton();
	});
}