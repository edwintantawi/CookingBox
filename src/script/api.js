import { saveRandomList,resetRandomList,checkRandomList,updateRandomFoodList } from './db.js';
// TheMealDB 
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

let numRandomFood = 20;
let countFood = 0;
let foodDatas = [];
// let randomFoodValidation = [];

const nowDate = new Date().getDate();
const nowMonth = new Date().getMonth();

checkRandomList().then(data => {
  if( data.createDate[0] < nowDate || data.createDate[1] < nowMonth ){
    resetRandomList(1);
  } else {
    console.log("You are Up to date");
  }
}).catch(error => {
  console.log("all recipes are saved")
})

export function getRandomFoods(){
    checkRandomList().then(data => {
        foodDatas = data.data;
        renderRandomFoods(foodDatas);
      }).catch(error => {
        console.log(error);
        getRandomFoodFromServer();
      });
}
 
async function getRandomFoodFromServer(update = false){
  try {
    while(countFood < numRandomFood){
      const response = await fetch(`${BASE_URL}/random.php`);
      const responseJson = await response.json();
      
      if( responseJson.error ){
        console.error(responseJson.message)
      } else {

          let notSame = true;
          for(let i = 0; i < foodDatas.length; i++ ){
            if(responseJson.meals[0].idMeal === foodDatas[i].idMeal ){
              notSame = false;
            }
          }
          if(notSame){
            foodDatas.push(responseJson.meals[0]);
            countFood += 1;
        }
      }
    }
    renderRandomFoods(foodDatas);
    if( update ){
      checkRandomList().then(data => {
        updateRandomFoodList({randomId: 1, createDate: [data.createDate[0],data.createDate[1]], data: foodDatas});
        countFood = 0;
      });
    } else {
      const nowDate = new Date().getDate();
      const nowMonth = new Date().getMonth();
      saveRandomList({randomId: 1, createDate: [nowDate,nowMonth], data: foodDatas});
      countFood = 0;
    }
    
  } catch (error) {
    console.log(error);
  }
  
}
  
export async function getMoreRandomFoods(){
  getRandomFoodFromServer(true);
}


function renderRandomFoods(foods, search = false, filter = null){
  const foodList = document.querySelector('#render-food');
  foodList.innerHTML = '';
  const loader = document.querySelector('.loader');
  const showMore = document.querySelector('.btn-show-more');
  if( search ){
    loader.style.display = 'none';
    showMore.style.visibility = 'hidden';
  } else {
    loader.style.display = 'none';
    showMore.style.visibility = 'visible';
  }
  for(let food of foods){
    foodList.innerHTML += `
    <div class="list__child__card">
    <a href="/detail.html?id=${food.idMeal}">
    <div class="wrap">
    <div class="picture"  style="background-image: url(${food.strMealThumb});" loading="lazy">
    </div>
    <div class="label">
    ${filter || food.strCategory}
    </div>
    </div>
    <div class="food-title">
    <h6>${food.strMeal}</h6>
    </div>
    </a>
    </div>
    `;
  }
}


// search by name
export async function searchFoodByName(id){
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${id}`);
    const responseJson = await response.json();

    if( responseJson.error ){
      console.log(responseJson.message);
    } else {
      if( responseJson.meals === null ){
        const foodList = document.querySelector('#render-food');
        foodList.innerHTML = `
          <center><p>Food with the name <b>"${id}"</b> was not found</p></center>
        `;
      }else {
        renderRandomFoods(responseJson.meals, true);
      }
    }

  } catch (error) {
    console.error(error);
  }
}


// get filter food | search by category
async function searchFoodByCategory(id, filter = false){
  try {
    const response = await fetch(`${BASE_URL}/filter.php?c=${id}`);
    const responseJson = await response.json();

    if( responseJson.error ){
      console.log(responseJson.message);
    } else {
      if( responseJson.meals === null ){
        const foodList = document.querySelector('#render-food');
        foodList.innerHTML = `
          <center><p>Food with the name <b>"${id}"</b> was not found</p></center>
        `;
      }else {
        renderRandomFoods(responseJson.meals, true, filter ? id : null);
      }
    }

  } catch (error) {
    console.error(error);
  }
}

// get category food list
export const  getFilterList = async type => {
  let filterName;
  switch(type){
    case 'c':
    filterName = 'Category';
    break;
    case 'a':
    filterName = 'Area';
    break;
    case 'i':
    filterName = 'Ingredients';
    break;
  }
  
  try {
    const response = await fetch(`${BASE_URL}/list.php?${type}=list`);
    const responseJson = await response.json();

    if( responseJson.error ){
      console.log(responseJson.message);
    }else{
      renderFilterItem(responseJson.meals, type, filterName)
    }

  } catch (error) {
    console.log(error);
  }
}

const renderFilterItem = (data, type, filterName) => {
  const filterPlaceholder = document.querySelector(`#${type}`);
  const filterSection = document.querySelector('.list__filter');
  const loader = document.querySelector('.loader');
  const foodList = document.querySelector('#render-food');
  for( let i of data ){
    filterPlaceholder.innerHTML += `
    <div class="list__filter__group__item" id="${i[`str${filterName === 'Ingredients' ? 'Ingredient' : filterName}`]}">
      <img src="https://www.themealdb.com/images/${filterName}/${i[`str${filterName === 'Ingredients' ? 'Ingredient' : filterName}`]}.png" alt="#">
      <p>${i[`str${filterName === 'Ingredients' ? 'Ingredient' : filterName}`]}</p>
    </div>
    `;
  }
  const filterItem = document.querySelectorAll('.list__filter__group__item');
  filterItem.forEach(item => {
    item.addEventListener('click', () => {
      loader.style.display = 'flex';
      foodList.innerHTML = '';
      if(item.id === 'random'){
        getRandomFoods();
      } else {
        searchFoodByCategory(item.id, true);
      }
      filterSection.classList.toggle('show');
    });
  });
}

