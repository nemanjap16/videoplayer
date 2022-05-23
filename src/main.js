const title = document.querySelector("#title");
// play/pause controls
const playBtn = document.querySelector(".play-fill");
const pauseBtn = document.querySelector(".pause-fill");
// volume controls
const volumeMuteBtn = document.querySelector(".volume-mute-fill");
const volumeDownBtn = document.querySelector(".volume-down-fill");
const volumeUpBtn = document.querySelector(".volume-up-fill");
const volumeSlider = document.querySelector('input[type = "range"]');
// video controls
const videoPlayer = document.querySelector("#video");
const videoControls = document.querySelector("#video-controls");
const currentTime = document.querySelector("#current-time");
const videoDuration = document.querySelector("#video-duration");
const skipForward = document.querySelector("#skip-forward");
const skipRewind = document.querySelector("#skip-rewind");

// initial state
title.textContent = "Ice Age - fox_family.mp4";
pauseBtn.classList.add("hidden");
// volume
volumeMuteBtn.classList.add("hidden");
volumeDownBtn.classList.add("hidden");
// volumeUpBtn.classList.add("hidden");

/**
 * Keyboard events
 */

document.body.addEventListener("keypress", (e) => {
  switch (e.code.toLowerCase()) {
    case "space":
      togglePlay();
      break;

    case "keyf":
      maxScreen();
      break;

    case "keyt":
      miniPlayer();
      break;

    case "keyw":
      wideScreen();
      break;

    case "keym":
      toggleMute();
      break;

    case "arrowright":
      skip(5);
      break;

    case "arrowleft":
      skip(-5);
      break;
  }
});

/**
 * Volume functions
 */

const showVolumeIcons = (value) => {
  if (value == 0) {
    volumeMuteBtn.classList.remove("hidden");
    volumeDownBtn.classList.add("hidden");
    volumeUpBtn.classList.add("hidden");
  } else if (value <= 0.5) {
    volumeMuteBtn.classList.add("hidden");
    volumeDownBtn.classList.remove("hidden");
    volumeUpBtn.classList.add("hidden");
  } else {
    volumeMuteBtn.classList.add("hidden");
    volumeDownBtn.classList.add("hidden");
    volumeUpBtn.classList.remove("hidden");
  }
};

volumeSlider.addEventListener("input", (e) => {
  video.volume = e.target.value;

  showVolumeIcons(video.volume);

  if (video.volume === 0) {
    video.muted = true;
  } else {
    video.muted = false;
  }
});

const toggleMute = () => {
  video.muted = !video.muted;
  volumeSlider.value = video.volume;
};

volumeMuteBtn.addEventListener("click", () => {
  toggleMute();
  showVolumeIcons(video.volume);
});
volumeDownBtn.addEventListener("click", () => {
  toggleMute();
  showVolumeIcons(0);
  volumeSlider.value = 0;
});
volumeUpBtn.addEventListener("click", () => {
  toggleMute();
  showVolumeIcons(0);
  volumeSlider.value = 0;
});

/**
 * Video functions
 */

const togglePlay = () => {
  if (video.paused) {
    video.play();
    playBtn.classList.toggle("hidden");
    pauseBtn.classList.toggle("hidden");
  } else {
    video.pause();
    playBtn.classList.toggle("hidden");
    pauseBtn.classList.toggle("hidden");
  }
};

videoPlayer.addEventListener("click", togglePlay);

playBtn.addEventListener("click", () => {
  togglePlay();
});

pauseBtn.addEventListener("click", () => {
  togglePlay();
});

/**
 * Display video duration
 */

const zeroFormatter = Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 });

const format = (d) => {
  d = Number(d);
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  let s = Math.floor((d % 3600) % 60);

  if (h == 0) {
    return `${m}:${zeroFormatter.format(s)}`;
  } else {
    return `${h}:${zeroFormatter.format(m)}:${zeroFormatter.format(s)}`;
  }
};

video.addEventListener("timeupdate", () => {
  currentTime.textContent = format(video.currentTime);
});

video.addEventListener("loadeddata", () => {
  videoDuration.textContent = format(video.duration);
});

const skip = (d) => {
  video.currentTime += d;
};

skipForward.addEventListener("click", () => {
  skip(5);
});
skipRewind.addEventListener("click", () => {
  skip(-5);
});
