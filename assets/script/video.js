const videoPlayer = document.getElementById('video-player');
const videoSource = document.getElementById('video-source');

const videoList = [
    'assets/videos/01.mp4'
];

let currentVideoIndex = 0;

function playRandomVideo() {
    const randomIndex = Math.floor(Math.random() * videoList.length);
    currentVideoIndex = randomIndex;
    videoSource.src = videoList[currentVideoIndex];
    videoPlayer.load();
    videoPlayer.play();
}

videoPlayer.addEventListener('ended', () => {
    currentVideoIndex = (currentVideoIndex + 1) % videoList.length;
    videoSource.src = videoList[currentVideoIndex];
    videoPlayer.load();
    videoPlayer.play();
});

playRandomVideo();
