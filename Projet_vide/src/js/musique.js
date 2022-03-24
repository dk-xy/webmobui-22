import { domOn, domForEach } from "./domManipulator.js";
const player = document.querySelector("#player");
const playerImg = player.querySelector("img")
const audio = player.querySelector("audio")

//mise en place son + img dans player




export default async function getSongs(id) {
    let artistPlaylist = [];
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
  
        //création de chaque chanson
        songs.forEach(song => {
          let list = document.querySelector('.listeTitres ul').appendChild(document.createElement('li'))
          let miniPlayButton = "<span class='material-icons song-icons play'>play_arrow</span>"
          let favouriteEmpty = "<span class='material-icons song-icons favorite'>favorite_border</span>";
          list.append(song.title)
          list.innerHTML+=miniPlayButton;
          list.innerHTML+=favouriteEmpty;
          list.setAttribute('songID', song.id)
          list.querySelector("span").setAttribute('src', song.audio_url)
          //création tableau de chanson a retourner
          console.log(song)
          localStorage.setItem('song-'+song.id, song.audio_url);
          // artistPlaylist.push({
          //   artist: song.artist,
          //   title: song.title,
          //   link: song.audio_url
          // })
        });
        
        //ecoute des clics
        domOn('.listeTitres ul li', 'click', evt=>{
          console.log(evt.target)
          let leLien = evt.target.querySelector("span").getAttribute("src")
          console.log(leLien)
          let liensMusique = evt.target.src;
          localStorage.setItem('currentSong', evt.target.getAttribute("songid"));
          document.location ="#player";
          const audioPlayer = document.querySelector("thePlayer");
          audio.src = leLien
          playerImg.src = songs[0].artist.image_url;
  
        })    
      }
 
      )
      console.log(artistPlaylist)
      return artistPlaylist; 
  }


