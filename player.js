

const tracks = [
  {
    title: "TRACK_1v2.12D: GOLDEN_VOWS.MP3",
    file: "PORTFOLIO_TRACKS/GOLDEN_VOWS.mp3"
  },   
  {
    title: "TRACK_2v1D: ASH.MP3",
    file: "PORTFOLIO_TRACKS/ash.mp3"
  },   
  {
    title: "TRACK_3v1.2L: FIRST_DAY_OUT.MP3",
    file: "PORTFOLIO_TRACKS/First_Day_Out.mp3"
  },   
  {
    title: "TRACK_4v3.2L: RUSTY.MP3",
    file: "PORTFOLIO_TRACKS/Rusty.mp3"
  },

  {
    title: "TRACK_5v1.0L: HIMENO.MP3",
    file: "PORTFOLIO_TRACKS/Himeno.mp3"
  },

  {
    title: "TRACK_6v8.4D: FRICTIONLESSSSSSS.MP3",
    file: "PORTFOLIO_TRACKS/FRICTIONLESSSSSSS.mp3"
  },

];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const trackTitle = document.getElementById("track-title");
const seekBar = document.getElementById("seek-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeBar = document.getElementById("volume-bar");

let currentIndex = 0;

function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.file;
  trackTitle.textContent = "[" + track.title + "]";
  seekBar.value = 0;
  currentTimeEl.textContent = "0:00";
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return mins + ":" + (secs < 10 ? "0" + secs : secs);
}

// load first track on startup
loadTrack(currentIndex);
audio.volume = volumeBar.value;

// play / Pause button
const playIcon = document.getElementById("play-icon");

// Play / Pause button
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playIcon.src = "PORTFOLIO_IMAGES/pause_btn.png"; // check your exact pause filename!
  } else {
    audio.pause();
    playIcon.src = "PORTFOLIO_IMAGES/play_btn.png";
  }
});

// Previous track (restarts song if past 1 second, otherwise goes to previous track!)
prevBtn.addEventListener("click", () => {
  if (audio.currentTime > 1) {
    audio.currentTime = 0;
    return; // stops here so it doesn't skip tracks!
  }

  currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentIndex);
  audio.play();
  playIcon.src = "PORTFOLIO_IMAGES/pause_btn.png";
});

// Next track (make sure nextBtn uses playIcon.src too!)
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % tracks.length;
  loadTrack(currentIndex);
  audio.play();
  playIcon.src = "PORTFOLIO_IMAGES/pause_btn.png";
});

// progress bar
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
});

// Automatically jump to the next track
audio.addEventListener("ended", () => {
  nextBtn.click();
});

// progress bar
seekBar.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
  }
});
// volume thing
volumeBar.addEventListener("input", () => {
  audio.volume = volumeBar.value;
});

/*find squeal button*/

const squealButtons = document.querySelectorAll(".squeal");
const squealSound = new Audio("PORTFOLIO_TRACKS/goldfish_squeal.mp3");

/* shaking animation */

squealButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // 1. Play squeak
    squealSound.currentTime = 0;
    squealSound.play();

    btn.classList.remove("shaking");
    void btn.offsetWidth;
    btn.classList.add("shaking");
  });

  // Clean up after the shake finishes
  btn.addEventListener("animationend", () => {
    btn.classList.remove("shaking");
  });
});