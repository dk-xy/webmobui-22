const player = document.querySelector("#player");

const audioPlayer = document.querySelector("audio");
const playButton = document.querySelector(".play")

export default function playerState(evt){


  
  switch (true) {
    case evt.target.classList.contains("play"):
      console.log("play")
    toggleState()
      
      break;
    case evt.target.classList.contains("previous"):
      console.log("previous")
      break;
    case evt.target.classList.contains("next"):
      console.log("next")
      break;

    default:
      break;
  }
}

export function toggleState() {
    if (audioPlayer.paused) {
      audioPlayer.play()
      playButton.textContent = "pause";
        
    } else{
      audioPlayer.pause()
      playButton.textContent ="play_arrow"
    }
  }