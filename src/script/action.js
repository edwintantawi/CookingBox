import { mobileNav, root, toggler, navLink, mobileLink, darkness } from './dom.js';

export function renderPage(route){
  const xhr = new XMLHttpRequest();

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

// navbar toggle
toggler.addEventListener('click', ()=>{
  toggler.classList.toggle('change');
  mobileNav.classList.toggle('show');
  darkness.classList.toggle('show');
});

// navigation link
navLink.forEach(link => {
  console.log(link)
  link.addEventListener('click', () => {
    switch(link.textContent){
      case 'Home':
        linkState('Home')
        break;
      case 'Search By':
        linkState('Home')
        break;
      case 'Collections':
        linkState('Collections')
        break;
      case 'About':
        linkState('About')
        break;
      default:
        break;
    }
  });
});

// active link
function linkState(route){
  console.log(route)
  navLink.forEach(link => {
    if( link.textContent === route ){
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// mobile navigation link
mobileLink.forEach(link => {
  console.log(link)
  link.addEventListener('click', () => {
    toggler.classList.toggle('change');
    mobileNav.classList.toggle('show');
    darkness.classList.toggle('show');
  });
});