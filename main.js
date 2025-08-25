//  LIST OF OUR MUSICS INFORMATION
const playList = [
  {
    musicName: "Remember Me",
    singerName: "d4vd",
    audioSrc: "assets/songs/remember me.mp3",
    coverSrc: "assets/images/cover1.jpg",
  },
  {
    musicName: "Playground",
    singerName: "Bea Miller",
    audioSrc: "assets/songs/Playground.mp3",
    coverSrc: "assets/images/cover2.jpg",
  },
  {
    musicName: "What Have They Done To Us",
    singerName: "Mako & Gray",
    audioSrc: "assets/songs/what have they done to us.mp3",
    coverSrc: "assets/images/cover3.jpg",
  },
  {
    musicName: "Wasteland",
    singerName: "Royal & the Serpent",
    audioSrc: "assets/songs/wasteland.mp3",
    coverSrc: "assets/images/cover4.jpg",
  },
  {
    musicName: "To Ashes and Blood",
    singerName: "Woodkid",
    audioSrc: "assets/songs/to ashes and blood.mp3",
    coverSrc: "assets/images/cover5.jpg",
  },
  {
    musicName: "Goodbye",
    singerName: "Ramsey",
    audioSrc: "assets/songs/goodbye.mp3",
    coverSrc: "assets/images/cover6.jpg",
  },
];

// ELEMENTS
const body = document.querySelector("body");
const audio = document.querySelector(".audio");
const cover = document.querySelector(".cover");
const playPauseButton = document.getElementById("play-pause-btn");
const playPauseIcon = document.querySelector(".fa-play");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const volumeBar = document.querySelector(".volume-bar");
const seekBar = document.querySelector(".seek-bar");
const coverImage = document.querySelector(".cover-image");
const currentTimeDisplay = document.querySelector(".current-time");
const totalTimeDisplay = document.querySelector(".total-time");
const musicName = document.querySelector(".music-name");
const singerName = document.querySelector(".singer-name");

let currentIndex = 0;
isPlaying = false;

// PLAY SONG
const playSong = () => {
  // SET BACKGROUND ANIMATION WHEN SONG STARTS
  body.classList.add("background-animation");
  playPauseIcon.classList.replace("fa-play", "fa-pause");
  cover.classList.add("cover-animation");
  isPlaying = true;
  audio.play();
};
// PAUS SONG
const pauseSong = () => {
  // remove BACKGROUND ANIMATION WHEN SONG STARTS
  body.classList.remove("background-animation");
  playPauseIcon.classList.replace("fa-pause", "fa-play");
  cover.classList.remove("cover-animation");
  isPlaying = false;
  audio.pause();
};
// LOAD SONG
const loadSong = () => {
  coverImage.src = playList[currentIndex].coverSrc;
  audio.src = playList[currentIndex].audioSrc;
  musicName.textContent = playList[currentIndex].musicName;
  singerName.textContent = playList[currentIndex].singerName;
};

// PLAY/PAUSE BUTTON
playPauseButton.addEventListener("click", () => {
  if (!isPlaying) {
    playSong();
  } else {
    pauseSong();
  }
});

// NEXT BUTTON
nextButton.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < playList.length) {
    loadSong();
    playSong();
  } else {
    currentIndex = 0;
    loadSong();
    playSong();
  }
});

// PREV BUTTON
prevButton.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = playList.length - 1;
    loadSong();
    playSong();
  } else {
    loadSong();
    playSong();
  }
});

// HANDLE AUDIO VOLUME
volumeBar.addEventListener("input", () => {
  audio.volume = volumeBar.value;
});

// SONG TIME DISPLAY
seekBar.addEventListener("input", () => {
  const newTime = audio.duration * (seekBar.value / 100);
  audio.currentTime = newTime;
});

// FORMAT TIME SONG
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${minutes}:${formattedSeconds}`;
};

// UPDATE TRACK PROGRESS
audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const totalTime = audio.duration;
  // UPDATE THUMB POSITION
  const percentage = (currentTime/totalTime) * 100;
  if (percentage) {
  seekBar.value=percentage;
  }
  // GO TO NEXT SONG WHEN THE CURRENT SONG FINISHED
  if (percentage===100) {
    nextButton.click();
  }
  // UPDATE DISPLAYED CURRENT TIME AND TOTAL TIME
  if ((currentTime, totalTime)) {
    currentTimeDisplay.textContent = formatTime(currentTime);
    totalTimeDisplay.textContent = formatTime(totalTime);
  }
});
