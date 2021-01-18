import { mobileNav, toggler, navLink, mobileLink, darkness, body, footerYears,  } from './dom.js';
import { renderPage } from './router.js';
import { getRandomFoods } from './api.js';
// navbar toggle
toggler.addEventListener('click', ()=>{
  changeState();
});

// navigation link
navLink.forEach(link => {
  link.addEventListener('click', () => {
    const linkRoute = link.getAttribute('href').substr(1); 
    switch(link.textContent){
      case 'Home':
        renderPage(linkRoute);
        linkState('home');
        break;
        case 'Search By':
        renderPage('home');
        linkState('home');
        break;
        case 'Collections':
        renderPage(linkRoute);
        linkState('collections');
        break;
        case 'About':
        renderPage(linkRoute);
        linkState('about');
        break;
      default:
        break;
    }
  });
});



// active link
export function linkState(route){
  navLink.forEach(link => {
    if( link.getAttribute('href').substr(1) === route ){
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// mobile navigation link
mobileLink.forEach(link => {
  link.addEventListener('click', () => {
    changeState();
  });
});

function changeState(){
  toggler.classList.toggle('change');
  mobileNav.classList.toggle('show');
  darkness.classList.toggle('show');
  body.classList.toggle('stuck');
}

// copyright
const firstYears = 2021;
const nowYears =  new Date().getFullYear();

if( firstYears === nowYears ){
  footerYears.innerHTML = nowYears;
} else {
  footerYears.innerHTML = `${firstYears} - ${nowYears}`;
}

// home page script
export function homePage(){
  getRandomFoods();
  const showMoreBtn = document.querySelector('.btn-show-more');
  const loader = document.querySelector('.loader');
  showMoreBtn.addEventListener('click', () => {
    getRandomFoods();
    loader.style.display = 'flex';
  });
}

