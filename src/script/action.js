import { navLink, mobileLink, footerYears, footer } from './dom.js';
import { renderPage } from './router.js';
import { getMoreRandomFoods, getRandomFoods } from './api.js';
// navbar toggle
// toggler.addEventListener('click', ()=>{
//   changeState();
// });

// navigation link
navLink.forEach(link => {
  link.addEventListener('click', () => {
    const linkRoute = link.getAttribute('href').substr(1); 
    switch(link.textContent){
      case 'Home':
        renderPage(linkRoute);
        linkState('home');
        footer.style.display = 'block';
        break;
        case 'Collections':
        renderPage(linkRoute);
        linkState('collections');
        footer.style.display = 'block';
        break;
        case 'About':
        renderPage(linkRoute);
        linkState('about');
        footer.style.display = 'block';
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

// state of navigation
// function changeState(){
//   toggler.classList.toggle('change');
//   mobileNav.classList.toggle('show');
//   darkness.classList.toggle('show');
//   body.classList.toggle('stuck');
// }

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
    getMoreRandomFoods();
    loader.style.display = 'flex';
  });
}

