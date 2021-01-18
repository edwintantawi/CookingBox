// TheMealDB
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

let numRandomFood = 20;
let countFood = 0;

export async function getRandomFoods(){
  
  try {
    let foodList = [];
    // for( let i = 1; i <= numRandomFood; i++ ){
    //   const response = await fetch(`${BASE_URL}/random.php`);
    //   const responseJson = await response.json();
      
    //   if( responseJson.error ){
    //     console.error(responseJson.message)
    //   } else {
    //     foodList.push(responseJson.meals[0]);
    //   }
    // }
    while(countFood < numRandomFood){
      const response = await fetch(`${BASE_URL}/random.php`);
      const responseJson = await response.json();
      
      if( responseJson.error ){
        console.error(responseJson.message)
      } else {
        if( countFood === 0 ){
          foodList.push(responseJson.meals[0]);
          countFood += 1;
        }else{
          let isSame = false;
          for(let i = 0; i < foodList.length; i++ ){
            if(responseJson.meals[0].idMeal === foodList[i] ){
              isSame = true;
            }
          }
          if(isSame == false){
            foodList.push(responseJson.meals[0]);
              countFood += 1;
          }
        }
      }
    }
    renderRandomFoods(foodList);
    countFood = 0;
    
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
