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

function render(hash) {
  domForEach('.section', elm=>{
    if(elm.classList.contains(hash.substring(1))){
      elm.classList.remove('hidden')
      elm.classList.add("active")
    } else{
      elm.classList.remove('active')
      elm.classList.add('hidden')
    }
  })
}









