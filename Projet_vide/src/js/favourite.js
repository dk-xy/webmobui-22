import { makeSong } from "./musique.js";

export default  function loadFavs(){
    for(let i = 0; i < localStorage.length; i++){ 

        let theSong = localStorage.key(i)
        console.log(theSong)
        let tabLink = theSong.split('-')
        console.log(tabLink)

        let songId = tabLink[1];
        let artistId = tabLink[2];
        let linkSong = "https://webmob-ui-22-spotlified.herokuapp.com/api/artists/"+artistId+"/songs/"+songId;
        if(tabLink[0] == "fav"){
            
            fetch(linkSong)
            .then((resp) => resp.json())
            .then((song) => {
                
                makeSong(song);
                
            })

        }

        // if(localStorage.getItem("fav-"+song.id+"-"+song.artist.id) != null){
        //     songIsFav = true;
        //     count++;
        // } else{
        //   songIsFav=false;
        // }

        

    }
}
//Parcours le localStorage pour chercher les favoris, !! ne marche que avec artistPlaylist !
//index 1 = chanson; index 2 = artist
export function isFav(song){
    let count = 0;
    let songIsFav = false;
    for(let i = 0; i < localStorage.length; i++){ 
        if(localStorage.getItem("fav-"+song.id+"-"+song.artist.id) != null){
            songIsFav = true;
            count++;
        } else{
          songIsFav=false;
        }
    }
    return songIsFav;
}