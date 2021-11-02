import WaveSurferLibrary from "wavesurfer.js";

let waveSurfer = null;

export function WSLoadNewTrack(
  trackURL,
  { isMute, volume },
  readyFunction,
  onProgressFunction,
  finishFunction,
) {
  if (waveSurfer != null) waveSurfer.destroy();

  waveSurfer = WaveSurferLibrary.create({
    container: document.querySelector(".playbar-wave"),
    waveColor: "#D9DCFF",
    progressColor: "#4353FF",
    cursorColor: "#4353FF",
    barWidth: 2,
    barRadius: 3,
    cursorWidth: 0,
    height: 48,
    barGap: 2,
    hideScrollbar: true,
    // fillParent: true
    partialRender: true,
    fillParent: true,
    autoCenter: true,
    responsive: true,
  });

  waveSurfer.load(trackURL);

  waveSurfer.on("ready", () => {
    let finalsecond = Math.floor(waveSurfer.getDuration() % 60);
    let finalminute = Math.floor((waveSurfer.getDuration() / 60) % 60);
    if (finalsecond < 10) {
      finalsecond = "0" + finalminute;
    }

    waveSurfer.play();
    waveSurfer.setVolume(volume / 100);
    waveSurfer.setMute(isMute);
    readyFunction(finalminute + ":" + finalsecond);
  });
  //set track progress time
  waveSurfer.on("audioprocess", () => {
    let second = Math.floor(waveSurfer.getCurrentTime() % 60);
    let minute = Math.floor((waveSurfer.getCurrentTime() / 60) % 60);

    if (second < 10) {
      second = "0" + second;
    }

    onProgressFunction(minute + ":" + second);
  });
  //reset play button
  waveSurfer.on("finish", () => {
    finishFunction();
    // skipForward();
  });
}

export function WSTogglePlayPause() {
  waveSurfer.playPause();
  return waveSurfer.isPlaying();
}

export function WSRewindBackward() {
  waveSurfer.skipBackward(5);
}

export function WSFastForward() {
  waveSurfer.skipForward(5);
}

export function WSToggleMute() {
  waveSurfer.setMute(!waveSurfer.getMute());
  return waveSurfer.getMute();
}

export function WSSetVolume(value) {
  waveSurfer.setVolume(value / 100);
}

export function WSDestroyInstance() {
  waveSurfer.destroy();
}
