
// TheMealDB
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

let numRandomFood = 20;
let countFood = 0;
let foodDatas = [];

export async function getRandomFoods(){
  
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
    countFood = 0;
    
  } catch (error) {
    console.log(error);
  }
  
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
    <a href="/src/pages/detail.html?id=${food.idMeal}">
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
