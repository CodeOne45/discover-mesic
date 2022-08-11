var player;
/** Test Youtube script --> create YT player */
function onYoutubeIframeAPIReady() {
  player = new YT.Player('music_player', {
    height: '360',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    events: {
      onReady: onPlayerReady,
      onStateChange: () => {
        console.log('change!');
      },
    },
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}


