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

window.addEventListener('load', evt=>{
  let hash = "#" + window.location.href.split('#')[1];
  console.log(hash) 
  render(hash); 
})

function render(hash) {
  domForEach('.section', elm=>{
    console.log(hash)
    if(elm.classList.contains(hash.substring(1))){
      elm.classList.remove('hidden')
      elm.classList.add("active")
    } else{
      elm.classList.remove('active')
      elm.classList.add('hidden')
    }
  })
  if (hash == "#artist") {
    getArtists()
  }
}



async function getArtists(){
  let link ="https://webmob-ui-22-spotlified.herokuapp.com/api/artists";
  const TMPL_ARTI = document.querySelector('.artistInd');
  console.log(TMPL_ARTI)

  fetch(link)
  .then((resp) => resp.json())
  .then((artistes) =>{
    console.log(artistes)

    //console.log(artistes)
    artistes.forEach(elm => {
      let tmpl = TMPL_ARTI.cloneNode(true)
      tmpl.classList.remove('hidden');
      console.log(elm.name)
      tmpl.querySelector('img').setAttribute('src', elm.image_url)
      tmpl.querySelector('.artistName').textContent = elm.name;
      // tmpl.querySelector('a').setAttribute = ('href', "#artists-"+elm.id)
      document.querySelector('#artiste').appendChild(tmpl)

    });
    
  })


}









