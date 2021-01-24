import { idbAddCollections, idbDeleteCollections, idbGetCollection } from '../db.js'

document.addEventListener('DOMContentLoaded', () => {
  const URL_PARAMS = new URLSearchParams(window.location.search);
  const MEAL_ID = URL_PARAMS.get("id");
  const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
  const placeHolder = document.querySelector('.detail');

  // back button function
  const backTarget = URL_PARAMS.get("from");
  // back button
  const backButton = document.querySelectorAll('.btn-detail-back');
  backButton.forEach(button => {
    button.setAttribute('href',`/index.html#${backTarget}`);
  });

  getDetailFood();

  async function getDetailFood(){
    try{  
      const response = await fetch(`${BASE_URL}/lookup.php?i=${MEAL_ID}`);
      const responseJson = await response.json();
      
      if( responseJson.error ){
        console.error(responseJson.message)
      }else {
        // ? handle null food tags
        let tags = '';
        const dataMeal = responseJson.meals[0];
        if ( dataMeal.strTags === null ){
          tags = ["Foods / Drink"]
        } else {
          tags = dataMeal.strTags.split(',');
        }

        // ? change title
        console.log(dataMeal)
        document.title = `CookingBox - ${dataMeal.strMeal}`;
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogUrl = document.querySelector('meta[property="og:url"]');
        const ogImage = document.querySelector('meta[property="og:image"]');
        ogTitle.setAttribute('content',`CookingBox - ${dataMeal.strMeal}`);
        ogUrl.setAttribute('content',`https://cookingbox.xyz/detail.html?id=${dataMeal.idMeal}`);
        ogImage.setAttribute('content',`${dataMeal.strMealThumb}`);
        
        // ? Loop ingredients
        const ingredients = [];
        for( let i = 1; i <= 20; i++ ){
          if( dataMeal[`strIngredient${i}`] !== null && dataMeal[`strIngredient${i}`] !== '' ){
            ingredients.push([dataMeal[`strIngredient${i}`], dataMeal[`strMeasure${i}`]]);
          }
        }
        // ? resplace \n to <br>
        const instructions = dataMeal.strInstructions.replace(/\n/g, "<br>");

        placeHolder.innerHTML = `
        <div class="detail__image" style="background-image:url(${dataMeal.strMealThumb});">
          <div class="label">
            ${dataMeal.strCategory}
          </div>
          <a class="play-video" title="Play Cooking Tutorial" href="${dataMeal.strYoutube}" target="_blank" rel="noopener noreferrer">
            <i class="far fa-play-circle"></i>  
          </a>
        </div>
        <div class="detail__text">
          <div class="wrap">
            <div class="title">
            <h2>
              ${dataMeal.strMeal}
            </h2>
            <div class="bookmark">
              <!-- bookmark logo -->
              <!-- <i class="fas fa-bookmark"></i> -->
              <i class="far fa-bookmark"></i>
            </div>
          </div>
          <div class="food-badge">
            ${
              tags.map(tag => {
                return `<span>${tag}</span>`;
              }).join('')
            }
          </div>
          <div class="ingredient">
            <h3>Ingredient</h3>
            <ul>
              ${
                ingredients.map(ingredient => {
                  return `<li><span>${ingredient[0]}</span> <span>${ingredient[1]}</span></li>`
                }).join('')
              }                
            </ul>
          </div>
          <div class="instructions">
            <h3>Instructions</h3>
            <p>
            ${instructions}
            </p>
          </div>  
          </div>
        </div>
        `;

        const bookmarkButton = document.querySelector('.bookmark');


        
        idbGetCollection(dataMeal.idMeal).then(() => {
          bookmarkButton.querySelector('i').classList.remove('far');
          bookmarkButton.querySelector('i').classList.add('fa');
        })
        .catch(()=> {
          bookmarkButton.querySelector('i').classList.remove('fa');
          bookmarkButton.querySelector('i').classList.add('far');
        })

        bookmarkButton.addEventListener('click', () => {
          
          idbGetCollection(dataMeal.idMeal).then(() => {
            deleteCollection(dataMeal.idMeal);
          })
          .catch(()=> {
            addCollection(dataMeal);
          })
         
        });

        // ? add collection
        const addCollection = collection => {
          idbAddCollections(collection);  

          bookmarkButton.querySelector('i').classList.remove('far');
          bookmarkButton.querySelector('i').classList.add('fa');
          
        }
        const deleteCollection = collection => {
          idbDeleteCollections(collection);  
        
          bookmarkButton.querySelector('i').classList.remove('fa');
          bookmarkButton.querySelector('i').classList.add('far');
        }

      }


  
    }catch(error){
      console.log(error)
    }
  }



})