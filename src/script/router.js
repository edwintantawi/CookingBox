import { root } from './dom.js';
// get route
export let route = window.location.hash.substr(1) || 'home';

renderPage(route);

export function renderPage(route){
  const xhr = new XMLHttpRequest();
  console.log("ok")
  xhr.onreadystatechange = function(){

    if( this.readyState === 4 ){
      if( this.status === 200 ){
        root.innerHTML = this.responseText;
      } else if( this.status === 404 ){
        root.innerHTML = "<p>ERROR 404</p>"
      } else {
        root.innerHTML = "<p>Opss.. Somethings Wrong</p>"
      }
    }
  }
  xhr.open("GET", `src/pages/${route}.html`, true);
  xhr.send();
} 

