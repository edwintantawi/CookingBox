// TheMealDB
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

let numRandomFood = 20;

export async function getRandomFoods(){
  
  try {
    let foodList = [];
    for( let i = 1; i <= numRandomFood; i++ ){
      const response = await fetch(`${BASE_URL}/random.php`);
      const responseJson = await response.json();
      
      if( responseJson.error ){
        console.error(responseJson.message)
      } else {
        foodList.push(responseJson.meals[0]);
      }
    }
    renderRandomFoods(foodList)
    
  } catch (error) {
    console.log(error);
  }
  
}

function renderRandomFoods(foods){
  const FoodList = document.querySelector('#render-food');
  const loader = document.querySelector('.loader');
  const showMore = document.querySelector('.btn-show-more');
  for(let food of foods){
    loader.style.display = 'none';
    showMore.style.visibility = 'visible';
    FoodList.innerHTML += `
    <div class="list__child__card">
    <a href="#">
    <div class="wrap">
    <div class="picture"  style="background-image: url(${food.strMealThumb});">
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
