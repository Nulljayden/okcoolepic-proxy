function decodeUrl(str) {
  if (!str) return str;
  const [input, ...search] = str.split('?');
  return decodeURIComponent(input)
    .split('')
    .map((char, ind) => (ind % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char))
    .join('') + (search.length ? '?' + search.join('?') : '');
}

window.onload = function () {
  const i = document.createElement('script');
  i.type = 'text/javascript';

  const url = new URL(decodeUrl(/[^/]*$/.exec(window.location.pathname)[0]));
  if (url.hostname.replace('www.', '') === 'youtube.com') {
    const videoPlayer = document.querySelector('#movie_player');

    function skipAd() {
      if (videoPlayer.classList.contains('ad-showing')) {
        videoPlayer.currentTime = videoPlayer.duration;
      }
    }

    skipAd();

    const observer = new MutationObserver(skipAd);
    observer.observe(videoPlayer, {
      attributes: true,
      attributeFilter: ['class'],
      childList: false,
      characterData: false,
    });

    i.text = `(${skipAd.toString()})()`;
  }

  document.body.appendChild(i);
};
