import { idbGetCollection } from '../db.js';


export const getCollectionList = () => {
  const collectionList = document.querySelector('.collections-list');
  const emptyState = document.querySelector('.empty-state');

  collectionList.classList.remove('hide');

  idbGetCollection().then(meals => {
    emptyState.style.display = 'none';
 
    for( let meal of meals ){
      collectionList.innerHTML += `
      <div class="list__child__card">
        <a href="/detail.html?id=${meal.idMeal}&from=${window.location.hash.substr(1)}">
        <div class="wrap">
          <div
            class="picture"
            style="background-image: url(${meal.strMealThumb});"
            loading="lazy"></div>
          <div class="label">
            ${meal.strCategory}
          </div>
        </div>
          <div class="food-title">
            <h6>${meal.strMeal}</h6>
          </div>
        </a>
      </div>
      `;
    }
  })
  .catch((error) => {
    console.log(error)
    collectionList.classList.add('hide');
    emptyState.style.display = 'block';
  })
}