import { domOn, domForEach } from "./domManipulator.js";
import { isFav } from "./favourite.js";
const player = document.querySelector("#player");
const playerImg = player.querySelector("img")
const audio = player.querySelector("audio")
const playButton = document.querySelector(".play")
//mise en place son + img dans player

//CREATION DU DOM MUSIQUE
export function makeSong(song) {


  let listParent = document.querySelectorAll(".listeTitres  ")


  let scopeList;
  listParent.forEach(elm => {
    if (elm.classList.contains('active')) {
      scopeList = elm;
    }
  })

  let scopeListUlt = scopeList.appendChild(document.createElement('li'))
  //let list = document.querySelector(".listeTitres ul").appendChild(document.createElement('li'))
  let miniPlayButton = "<span class='material-icons song-icons play'>play_arrow</span>"
  let favouriteEmpty = "<span class='material-icons song-icons favorite'>favorite_border</span>";
  let favouriteFull = "<span class='material-icons song-icons favorite'>favorite</span>";


  console.log(song)

  //en faire une fonction?

  console.log(isFav(song))
  scopeListUlt.append(song.title)
  scopeListUlt.innerHTML += miniPlayButton;
  //verif si favori
  if (isFav(song)) {
    scopeListUlt.innerHTML += favouriteFull;
  } else {
    scopeListUlt.innerHTML += favouriteEmpty;
  }
  scopeListUlt.setAttribute('songID', song.id)
  scopeListUlt.querySelector("span").setAttribute('src', song.audio_url)
}

export default async function getSongs(id) {
  let artistPlaylist = [];
  let link = "https://webmob-ui-22-spotlified.herokuapp.com/api/artists/" + id + "/songs"
  let listNode = document.querySelector('.listeTitres');


  fetch(link)
    .then((resp) => resp.json())
    .then((songs) => {
      //création de chaque chanson
      songs.forEach(song => {
        makeSong(song);
        //ajout de la chanson selectionnée au localStorage
        localStorage.setItem('song-' + song.id, song.audio_url);
        artistPlaylist.push({
          songid: song.id,
          artistid: song.artist.id, //ici reprendre ça pour le fav
          url: song.audio_url
        })
      });

      //ecoute des clics
      domOn('.listeTitres ul li', 'click', evt => {

        console.log(evt.target)
        if (evt.target.classList.contains('play')) {
          console.log(evt.target)
          let leLien = evt.target.querySelector("span").getAttribute("src")
          console.log(leLien)
          let liensMusique = evt.target.src;
          localStorage.setItem('currentSong', evt.target.getAttribute("songid"));
          document.location = "#player";
          const audioPlayer = document.querySelector("thePlayer");
          audio.src = leLien
          playerImg.src = songs[0].artist.image_url;
          audio.play()
          playButton.textContent = "pause";

        }

      })

      //ecoute des favoris
      domOn('.favorite', 'click', evt => {
        let chosenSong = evt.target.parentElement.getAttribute("songid")
        evt.target.textContent = "favorite";
        artistPlaylist.forEach(songP => {
          console.log(songP)
          if (songP.songid == chosenSong) {
            console.log(songP)
            var count = 0;
            for (let i = 0; i < localStorage.length; i++) {
              if (localStorage.getItem("fav-" + songP.songid + "-" + songP.artistid) == null) {
                localStorage.setItem("fav-" + songP.songid + "-" + songP.artistid, songP.url);
                count++;
              }
            }

          }
        })
      }
      )
    }

    )
  // console.log(artistPlaylist)
  return artistPlaylist;
}


