import './css/index.css';
import { domOn, domForEach } from "./js/domManipulator.js";
import getArtists from "./js/artist.js";
import getSongs from "./js/musique.js";
import playerState, { toggleState } from "./js/player.js";
import loadFavs from "./js/favourite.js"
let currentPlaylist;





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
  let listParent;

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
    listParent = document.querySelector('.musicP')
    //console.log(hash);
    //console.log(hash)
    let tabLink = hash.split('-')
    let artistID = tabLink[1]
    document.querySelectorAll('.listeTitres').forEach(elm => {
      //elm.textContent =""
    });;

    currentPlaylist = getSongs(artistID);
    console.log(currentPlaylist);
    document.querySelector('.artistSongs').classList.remove('hidden')
    document.querySelector('.music .listeTitres').classList.remove('active')
    document.querySelector('.artistSongs .listeTitres').classList.add('active')
    
  }

  if (hash == "#music") {
    let hash = "#" + window.location.href.split('#')[1];
    let currentNode = document.querySelector('.music .listeTitres')
    currentNode.classList.add('active')
    document.querySelector('.artistSongs .listeTitres').classList.remove('active')
    currentNode.textContent ='';
    document.querySelector('.listeTitres .active ul').textContent ="";
    loadFavs()
    console.log("chedckplay")
  }
  if (!hash.split('-').length > 1 || hash != "#player") {
    console.log('hello')

  }
}



//PARTIE PLAYER-------------------------------------------------------------------------

//prendre l'evt et l'envoyer dans une fonction?
domOn('.playerIcon', 'click', evt => {

  playerState(evt)

})





//PARTIE MUSIQUE -----------------------------------------------------------------------


//PARTIE ARTISTE-------------------------------------------------------------
















