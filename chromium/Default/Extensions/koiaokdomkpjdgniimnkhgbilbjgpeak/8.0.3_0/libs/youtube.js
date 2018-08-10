function onPlayerReady(callback) {
  const playerSelector = '#movie_player';
  const target = document.documentElement;
  const options = {
    childList: true,
    subtree: true,
  };

  function mutationObserverCallback(mutationRecords, mutationObserver) {
    if (document.querySelector(playerSelector)) {
      mutationObserver.disconnect();
      callback();
    }
  }

  const mutationObserver = new MutationObserver(mutationObserverCallback);
  mutationObserver.observe(target, options);
}

function getQuality() {
  let quality;

  try {
    quality = localStorage.getItem('yt-player-quality');
    quality = quality && JSON.parse(quality);
    quality = quality.data || null;
  } catch (e) {
    quality = null;
  }

  return quality;
}

function setQuality(quality) {
  try {
    localStorage.setItem('yt-player-quality', JSON.stringify({
      data: quality,
      expiration: (+new Date() + (1000 * 60 * 60 * 24)),
      creation: +new Date(),
    }));
  } catch (e) {
    // could be e.g., if storage full, we have to just fall silently
    console.error('Error at VideoService > setQuality', e);
  }
}

function setSize(prevSize = 1) {
  const currentSize = getCookie('wide');

  if (prevSize !== +currentSize) {
    let button = document.querySelector('.ytp-size-button.ytp-button');
    setTimeout(() => {
      button && button.click();
    }, 1000);
  }
}

function applyVideoQuality() {
  function getQuality(player) {
    try {
      const highestAvailableQualityLevels = player.getAvailableQualityLevels();
      const storageQuality = JSON.parse(localStorage.getItem('yt-player-quality'));
      const quality = (storageQuality && storageQuality.data) || 'auto';
      const qualityIndex = highestAvailableQualityLevels.indexOf(quality);

      return (highestAvailableQualityLevels.length === 0 || qualityIndex > 0) ? quality : highestAvailableQualityLevels[0];
    } catch (e) {
      return undefined;
    }
  }

  const PlayerStates = {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5,
  };
  const player = document.querySelector('#movie_player');
  const quality = getQuality(player);

  if (player && player.setPlaybackQualityRange && quality) {
    const playerState = player.getPlayerState();
    player.setPlaybackQualityRange(quality, quality);

    player.addEventListener('onStateChange', (state) => {
      if (state === PlayerStates.BUFFERING) {
        const quality = getQuality(player);
        if (quality) {
          player.setPlaybackQualityRange(quality, quality);

          if (playerState !== PlayerStates.PAUSED) {
            player.playVideo && player.playVideo();
          } else {
            player.pauseVideo && player.pauseVideo();
          }
        }
      }
    });
  }
}

chrome.storage.onChanged.addListener((changes, area) => {
  const script = document.createElement('script');

  let shouldExec = true;

  if (area !== 'sync') return;

  Object.keys(changes).forEach((key) => {
    switch (key) {
      case 'quality':
        script.textContent = `(${applyVideoQuality.toString()})();`;
        break;
      default:
        shouldExec = false;
    }
  });

  if (shouldExec) {
    const scriptDom = document.documentElement.appendChild(script);

    scriptDom.remove();
  }
});

if (REGEXP.youtube.test(location.href)) {
  onPlayerReady(() => {
    const scriptQuality = document.createElement('script');
    scriptQuality.textContent = '(' + applyVideoQuality.toString() + ')();';
    document.documentElement.appendChild(scriptQuality);
    scriptQuality.remove();
  });

  function syncSize() {
    const currentSize = getCookie('wide');
    // fallback if user comes to us first time or with cleaned cookie
    // reload would happen just once for whole life in our scenario
    if (currentSize.length === 0) {
        document.cookie = 'wide=' + size + '; domain=.youtube.com';
        window.location.reload();
    }
  }

  chrome.storage.sync.get((settings) => {
    let quality = settings.quality ? settings.quality : 'auto',
      size = typeof settings.size !== 'undefined' ? settings.size : 1,
      script = buildScript([{
        type: 'string',
        name: 'quality',
        data: quality
      }, {
        type: 'number',
        name: 'size',
        data: size
      }, {
        type: 'function',
        exec: false,
        data: getCookie
      }, {
        type: 'function',
        exec: true,
        data: syncSize
      }, {
        type: 'function',
        exec: false,
        data: setQuality
      }]);

    addScript({
      textContent: script
    });
  });
}
