import './css/index.css';
import { domOn, domForEach } from "./js/domManipulator.js";
import getArtists from "./js/artist.js";
import getSongs from"./js/musique.js";
import playerState, {toggleState}from "./js/player.js";




window.addEventListener('hashchange', evt => {
  let hash = "#" + window.location.href.split('#')[1];
  //console.log(hash)
  render(hash);

})

window.addEventListener('load', evt => {
  let hash = "#" + window.location.href.split('#')[1];
  //console.log(hash)
  render(hash);

})



function render(hash) {




  domForEach('.section', elm => {
    //console.log(hash)
    //console.log(hash.substring(1))
    if (elm.classList.contains(hash.substring(1))) {
      elm.classList.remove('hidden')
      elm.classList.add("active")
    } else {
      elm.classList.remove('active')
      elm.classList.add('hidden')
    }

  })

  if (hash == "#artist") {
    getArtists()
  } else if (hash.split('-').length > 1) {
    //console.log(hash);
    //console.log(hash)
    let tabLink = hash.split('-')
    let artistID = tabLink[1]
    getSongs(artistID);
    document.querySelector('.artistSongs').classList.remove('hidden')
  }

}



//PARTIE PLAYER-------------------------------------------------------------------------

//prendre l'evt et l'envoyer dans une fonction?
domOn('.playerIcon', 'click', evt => {

playerState(evt)
  
})





//PARTIE MUSIQUE -----------------------------------------------------------------------


//PARTIE ARTISTE-------------------------------------------------------------
















