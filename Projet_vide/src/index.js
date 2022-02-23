import './css/index.css';
// import domManipulator from "./js/domManipulator.js";

function domOn(selector, event, callback) {
    domForEach(selector, ele => ele.addEventListener(event, callback));
  }
  
  // Param: selecteur + fonction a lancer
  function domForEach(selector, callback) {
    document.querySelectorAll(selector).forEach(callback);
  }


console.log("hello");
const monBouton = document.querySelector('.leFooter');

monBouton.addEventListener('click', evt => {
  console.log(evt);
});

domOn('.leFooter', 'click', evt=>{
    console.log("helloToYou")
    console.log(evt);
    console.log(evt.target)
})

domOn('body','click', evt=>{
    console.log("hello Body")
    console.log(evt);
    console.log(evt.target)
})

domOn('#leBut', 'click', evt=>{
    console.log("touch butt")
})

domOn('button', 'click', evt=>{
  console.log("touch butt")
})

console.log(2+1)








