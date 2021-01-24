// import
import { getRandomMore, getRandom, searchByName, getFilterList } from '../api.js';

export function homePageAction(){
  // DOM
  const searchInput = document.querySelector('#search-input');
  const searchFilter = document.querySelector('#search-filter');
  const searchReset = document.querySelector('.search-reset');
  const sectionFilter = document.querySelector('.list__filter');
  const sectionFood = document.querySelector('#render-food');
  const btnShowMore = document.querySelector('.btn-show-more');
  const loader = document.querySelector('.loader');

  // init
  getRandom();
  getFilterList();

  // show more
  btnShowMore.addEventListener('click', () => {
    getRandomMore();
    loader.style.display = 'flex';
    btnShowMore.style.display = 'none'
  });

  // search
  searchInput.addEventListener('keyup', () => {
    if( searchInput.value === '' || searchInput.value === ' '|| searchInput.value === null ){
      getRandom();
      searchReset.classList.toggle('show');
    } else {
      sectionFood.innerHTML = '';
      loader.style.display = 'none'
      searchByName(searchInput.value);
      searchReset.classList.add('show');
    }
  });
  
  // reset
  searchReset.addEventListener('click', () => {
    searchInput.value = '';
    getRandom();
    searchReset.classList.toggle("show");
  });

  // filter
  searchFilter.addEventListener('click', () => {
    sectionFilter.classList.toggle('show');
  });
}
