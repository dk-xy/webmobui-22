//default seulement une seule
export default async function getArtists() {
    let artistIsLoaded = false;
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

 export async function makeArtists(art) {
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