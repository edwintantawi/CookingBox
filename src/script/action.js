import { navLink, mobileLink, footerYears, footer } from './dom.js';
import { renderPage } from './router.js';
import { getMoreRandomFoods, getRandomFoods, searchFoodByName } from './api.js';
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

  // search
  const searchInput = document.querySelector('#search-input');
  const searchFilter = document.querySelector('#search-filter');
  const searchResetLogo = document.querySelector('.search-reset-logo');
  const filterSection = document.querySelector('.list__filter');

  searchInput.addEventListener('keyup', () => {
    if( searchInput.value === '' || searchInput.value === ' '|| searchInput.value === null ){
      getRandomFoods();
      searchResetLogo.style.visibility = 'hidden';
    } else {
      searchFoodByName(searchInput.value);
      searchResetLogo.style.visibility = 'visible';
    }
  });
  
  searchResetLogo.addEventListener('click', () => {
    searchInput.value = '';
    getRandomFoods();
    searchResetLogo.style.visibility = 'hidden';
  });

  // filter
  searchFilter.addEventListener('click', () => {
    filterSection.classList.toggle('show');
  });

}
