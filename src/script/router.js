import { root } from './dom.js';
// get route
export let route = window.location.hash.substr(1) || 'home';
if(route === 'searchby') route = 'home'

renderPage(route);

export function renderPage(route){
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){

    if( this.readyState === 4 ){
      if( this.status === 200 ){
        root.innerHTML = this.responseText;
      } else if( this.status === 404 ){
        root.innerHTML = "<h1><center>ERROR 404 Page Not Found</center></h1>"
      } else {
        root.innerHTML = "<h1><center>Opss.. Somethings Wrong</center></h1>"
      }
    }
  }
  xhr.open("GET", `src/pages/${route}.html`, true);
  xhr.send();
} 

