import { saveRandomList,resetRandomList,checkRandomList,updateRandomFoodList } from './db.js';
// TheMealDB 
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

let numRandomFood = 20;
let countFood = 0;
let foodDatas = [];
// let randomFoodValidation = [];

const nowDate = new Date().getDate();
const nowMonth = new Date().getMonth();
console.log(nowDate)
console.log(nowMonth)
checkRandomList().then(data => {
  console.log(data.createDate);
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
        console.log("im resolve")
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
      console.log("update")
      checkRandomList().then(data => {
        updateRandomFoodList({randomId: 1, createDate: [data.createDate[0],data.createDate[1]], data: foodDatas});
        countFood = 0;
      });
    } else {
      const nowDate = new Date().getDate();
      const nowMonth = new Date().getMonth();
      saveRandomList({randomId: 1, createDate: [nowDate,nowMonth], data: foodDatas});
      countFood = 0;
      console.log("new")
    }
    
  } catch (error) {
    console.log(error);
  }
  
}
  
export async function getMoreRandomFoods(){
  // resetRandomList(1);
  getRandomFoodFromServer(true);
}


function renderRandomFoods(foods){
  const foodList = document.querySelector('#render-food');
  foodList.innerHTML = '';
  const loader = document.querySelector('.loader');
  const showMore = document.querySelector('.btn-show-more');
  for(let food of foods){
    loader.style.display = 'none';
    showMore.style.visibility = 'visible';
    foodList.innerHTML += `
    <div class="list__child__card">
    <a href="/detail.html?id=${food.idMeal}">
    <div class="wrap">
    <div class="picture"  style="background-image: url(${food.strMealThumb});" loading="lazy">
    </div>
    <div class="label">
    ${food.strCategory}
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
      // foodSearchDatas.push(...responseJson.meals);
      console.log(responseJson)
      if( responseJson.meals === null ){
        const foodList = document.querySelector('#render-food');
        foodList.innerHTML = `
          <center><p>Food with the name <b>"${id}"</b> was not found</p></center>
        `;
      }else {
        renderRandomFoods(responseJson.meals);
      }
    }

  } catch (error) {
    console.error(error);
  }
}
