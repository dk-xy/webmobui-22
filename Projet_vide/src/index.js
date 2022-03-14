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
  console.log(hash)
  render(hash);

})

window.addEventListener('load', evt => {
  let hash = "#" + window.location.href.split('#')[1];
  //console.log(hash)
  render(hash);
  
})



function render(hash) {

  


  domForEach('.section', elm => {
    console.log(hash)
    console.log(hash.substring(1))
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
    console.log(hash)
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






//PARTIE MUSIQUE -----------------------------------------------------------------------
async function getSongs(id) {
  let link = "https://webmob-ui-22-spotlified.herokuapp.com/api/artists/" + id + "/songs"
 let listNode = document.querySelector('.listeTitres');
 if(listNode.hasChildNodes()){
  listNode.removeChild(listNode.firstChild);
 }

  fetch(link)
    .then((resp) => resp.json())
    .then((songs) => {
      console.log(songs)

        document.querySelector('.listeTitres').append(document.createElement('ul'))

      
      songs.forEach(song => {
        let lit = document.querySelector('.listeTitres ul').appendChild(document.createElement('li'))
        // let elmList = document.querySelector('.listeTitres ul')
        // elmList.append(document.createElement('li'))
        // document.querySelector('.listeTitres ul li').append(song.title)
        lit.append(song.title)

      });


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
      console.log(artistes)
      console.log(artistIsLoaded)

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











