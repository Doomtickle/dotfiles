function action1() {//universal
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

function action2() {//for vimeo
  function init() {
		if (window.vimeo) {
			try {
				const createDownloadButtonStyleElement = (className) => {
					const style = document.createElement('style');

					style.textContent = `
						.${className} { display: inline-flex; position: relative; width: 100%; margin: 0px 0px 0.5rem; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-weight: 700; border-width: 0.0625rem; border-style: solid; transition: all 0.1s ease-in-out 0s; text-align: center; vertical-align: middle; letter-spacing: 0.1px; -webkit-box-align: center; align-items: center; -webkit-box-pack: center; justify-content: center; -webkit-font-smoothing: antialiased; min-width: 5.25rem; min-height: 2.4375rem; padding: 0px 1rem; font-size: 0.875rem; line-height: 2.71429; border-radius: 0.1875rem; background-color: rgb(238, 241, 242); border-color: rgb(238, 241, 242); color: rgb(26, 46, 59); }
						@media screen and (min-width: 48em) {
						  .${className} { width: auto; margin-right: 0.5rem; }
						  .${className}:last-of-type { margin-right: 0px; }
						}
						.${className}:hover { cursor: pointer; background-color: rgb(227, 232, 233); border-color: rgb(227, 232, 233); color: rgb(26, 46, 59); }"
						.${className}:focus { outline: none; }"
						.${className}:active { outline: none; transform: scale(0.98); background-color: rgb(221, 227, 229); border-color: rgb(221, 227, 229); }"
						.${className}:disabled, .${className}:disabled:hover, .${className}:disabled:active { cursor: not-allowed; outline: none; transform: scale(1); pointer-events: none; background-color: rgb(227, 232, 233); border-color: rgb(227, 232, 233); color: rgb(208, 216, 219); }"
					`;

					return style;
				};

				let videoId = vimeo['clip_page_config']['clip']['id'],
					videoInfo = vimeo['clips'][videoId],
					title = videoInfo['video']['title'],
					streams = videoInfo['request']['files']['progressive'];

				streams.sort((streamA, streamB) => {
					return streamB.width - streamA.width;
				});

				let filename = title.replace(/[<>:"\/\\|?*]/g, '') + '.mp4',
					button = document.getElementById(buttonId);

				button.dataset.url = streams[0].url;
				button.dataset.fileName = filename;
				button.title = "Download " + streams[0].quality;
				button.innerText = "       " + "Download " + streams[0].quality;

				if (document.getElementsByClassName(button.className).length === 1) {
					const className = 'me-default-download-button';

					const style = createDownloadButtonStyleElement(className);
					document.documentElement.appendChild(style);

					button.className = className;
				}

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

	const isVimeoVideoPage = (url) => {
    return /^https?:\/\/vimeo\.com\/(?:channels\/staffpicks\/)?\d+/.test(url);
  };

	if (isVimeoVideoPage(document.URL)) {
    init();
  }
}
