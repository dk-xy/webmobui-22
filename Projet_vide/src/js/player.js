const player = document.querySelector("#player");
const playerImg = player.querySelector("img")
const audio = player.querySelector("audio")
//mise en place son + img dans player


const playerButtons = document.querySelector(".playerIcon")
const audioPlayer = document.querySelector("audio");
const playButton = document.querySelector(".play")


export default function playerState(evt){
console.log(evt)

let currentSong = localStorage.getItem("currentSong");
let intID = parseInt(currentSong)

  switch (true) {
    case evt.target.classList.contains("play"):
      console.log("play")
      console.log(currentSong)
    toggleState()
      
      break;
    case evt.target.classList.contains("previous"):
      console.log("previous")
      let previousID = intID-1;
      let textualPreviousInt = previousID.toString();
      let textualPreviousID = "song-"+textualPreviousInt
      audioPlayer.src = localStorage.getItem(textualPreviousID)
      localStorage.setItem("currentSong", textualPreviousInt)
      toggleState()
      
      break;
    case evt.target.classList.contains("next"):
      console.log("next")
      //parsedNextSongID = parseInt() +1;
      let nextID = intID+1;
      let textualNextInt = nextID.toString();
      let textualNextID = "song-"+nextID.toString()
      audioPlayer.src = localStorage.getItem(textualNextID)
      localStorage.setItem("currentSong", textualNextInt)
      toggleState()
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