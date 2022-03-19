import './css/index.css';
import domManipulator from "./js/domManipulator.js";

function domOn(selector, event, callback) {
  domForEach(selector, ele => ele.addEventListener(event, callback));
}

// Param: selecteur + fonction a lancer
function domForEach(selector, callback) {
  document.querySelectorAll(selector).forEach(callback);
}





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

// async function getSongs(){
//   domOn('.artistInd', 'click', evt=>{
//     console.log(evt.target.parentElement)
//     let target = evt.target.parentElement;
//     console.log(target.getAttribute('artistno')) 
//   })

// }




//PARTIE PLAYER-------------------------------------------------------------------------
const player = document.querySelector("#player");
const playerImg = player.querySelector("img")
const audio = player.querySelector("audio")
//mise en place son + img dans player
//audio.src = "https://webmob-ui-22-spotlified.herokuapp.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBDQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cf1aeb1d1391067450a1b117320ad17a3a65f7e1/Fade.mp3"
//playerImg.src = "https://webmob-ui-22-spotlified.herokuapp.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b41ee2870130aa8fbec1d03d07293d9e6939b8c3/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--182003c2101b045e9b5aec98ac388f079c4a05e1/image.jpg"


const playerButtons = document.querySelector(".playerIcon")
const audioPlayer = document.querySelector("audio");
const playButton = document.querySelector(".play")
domOn('.playerIcon', 'click', evt => {
  console.log(evt.target)
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
})

function toggleState() {
  if (audioPlayer.paused) {
    audioPlayer.play()
    playButton.textContent = "pause";
      
  } else{
    audioPlayer.pause()
    playButton.textContent ="play_arrow"
  }
}
//PARTIE MUSIQUE -----------------------------------------------------------------------
async function getSongs(id) {
  let link = "https://webmob-ui-22-spotlified.herokuapp.com/api/artists/" + id + "/songs"
  let listNode = document.querySelector('.listeTitres');
  if (listNode.hasChildNodes()) {
    listNode.removeChild(listNode.firstChild);
  }

  fetch(link)
    .then((resp) => resp.json())
    .then((songs) => {
      console.log(songs)

      document.querySelector('.listeTitres').append(document.createElement('ul'))


      songs.forEach(song => {
        let list = document.querySelector('.listeTitres ul').appendChild(document.createElement('li'))
        let miniPlayButton = "<span class='material-icons play'>play_arrow</span>"
        list.append(song.title)
        list.innerHTML+=miniPlayButton
        list.querySelector("span").setAttribute('src', song.audio_url)
      });

      domOn('.listeTitres ul li', 'click', evt=>{
        console.log(evt.target)
        let leLien = evt.target.querySelector("span").getAttribute("src")
        console.log(leLien)
        //console.log(evt.target.src)
        let liensMusique = evt.target.src;
        //console.log(liensMusique)
        document.location ="#player";
        const audioPlayer = document.querySelector("thePlayer");
        audio.src = leLien
        playerImg.src = songs[0].artist.image_url;

      })


    }
    )
}

//PARTIE ARTISTE-------------------------------------------------------------
let artistIsLoaded = false;

async function getArtists() {
  let link = "https://webmob-ui-22-spotlified.herokuapp.com/api/artists";
  fetch(link)
    .then((resp) => resp.json())
    .then((artistes) => {
      //console.log(artistes)
      //console.log(artistIsLoaded)

      //Chargement artistes---------------------------
      if (!artistIsLoaded) {
        artistes.forEach(elm => {
          makeArtists(elm)
          // tmpl.querySelector('a').setAttribute = ('href', "#artists-"+elm.id)

          // tmpl.querySelector('.artistInd').setAttribute('id', '#artistInd-'+elm.id)
          artistIsLoaded = true;
          return artistIsLoaded;
        });
        //Chargement chansons------------------------------

      }

    })
}

async function makeArtists(art) {
  const TMPL_ARTI = document.querySelector('.artistInd');
  let tmpl = TMPL_ARTI.cloneNode(true)
  tmpl.id = "#artistInd-" + art.id
  tmpl.setAttribute('artistno', art.id)
  tmpl.setAttribute('href', '#artist-' + art.id)
  tmpl.classList.remove('hidden');
  tmpl.querySelector('img').setAttribute('src', art.image_url)
  tmpl.querySelector('.artistName').textContent = art.name;
  document.querySelector('#artiste').appendChild(tmpl)

}











