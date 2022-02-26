import './css/index.css';
import domManipulator from "./js/domManipulator.js";

function domOn(selector, event, callback) {
    domForEach(selector, ele => ele.addEventListener(event, callback));
  }
  
  // Param: selecteur + fonction a lancer
  function domForEach(selector, callback) {
    document.querySelectorAll(selector).forEach(callback);
  }


//  Selection du menu dynamique 

domOn('.menu', 'click', evt=>{
    console.log("helloToYou")
    console.log(evt);
    console.log(evt.target)
    let selection = evt.target.id
    console.log(selection);
    domForEach('.section', evt=>{
      //check ce qui est actif et le cache
      if (evt.classList.contains('active')) {
        window.setTimeout( function() {
          evt.classList.remove('active');  
      }, 100);
      
      evt.classList.add('hidden');   

      }
      //affiche la séléction
      if (evt.classList.contains(selection)) {
        window.setTimeout( function() {
          evt.classList.add('active');
          evt.classList.remove('hidden');
      }, 100);
      

        
      }
    })
    
})










