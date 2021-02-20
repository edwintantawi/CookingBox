import { idbAdd, idbDelete, idbGet, idbUpdate } from './db.js';
// Base Url TheMealDB
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// * --------------------------- START : Init State --------------------------- */
let numRandomFood = 20;
let countFood = 0;
let foodArray = [];

const nowDate = new Date().getDate();
const nowMonth = new Date().getMonth();

// ? Check expired data ( reset random food list every 1 day )
idbGet().then(data => {
  if (data.createDate[0] < nowDate || data.createDate[1] < nowMonth) {
    idbDelete('random');
    getRandom();
  } else {
    console.log("You are Up to date");
  }
}).catch(() => {
  console.log("all recipes are saved");
})
// * ---------------------------- END : Init State ---------------------------- */




// * -------------------------- START : Main Function ------------------------- */
export const getRandom = () => {
  // ? Check IDB, if exist get it, else request it
  idbGet().then(data => {
    foodArray = data.data;
    renderData({ datas: foodArray, isSearch: false, filter: null });
  }).catch(() => {
    getRandomRequest({ isUpdate: false });
  });
}

export const getRandomMore = () => {
  // ? Show more random food by request more random
  getRandomRequest({ isUpdate: true });
}

export const searchByName = async name => {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
    const responseJson = await response.json();

    if (responseJson.error) {
      console.log(responseJson.message);
    } else {
      if (responseJson.meals === null) {
        const foodList = document.querySelector('#render-food');
        foodList.innerHTML = `
          <center><p>Food with the name <b>"${name}"</b> was not found</p></center>
        `;
      } else {
        renderData({ datas: responseJson.meals, isSearch: true, filter: false });
      }
    }

  } catch (error) {
    console.error(error);
  }
}

export const getFilterList = async () => {

  try {
    const response = await fetch(`${BASE_URL}/list.php?c=list`);
    const responseJson = await response.json();

    if (responseJson.error) {
      console.log(responseJson.message);
    } else {
      renderFilterList(responseJson.meals)
    }

  } catch (error) {
    console.log(error);
  }

}

const searchByCategory = async ({ category, isFilter }) => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const responseJson = await response.json();

    if (responseJson.error) {
      console.log(responseJson.message);
    } else {
      if (responseJson.meals === null) {
        const foodList = document.querySelector('#render-food');
        foodList.innerHTML = `
          <center><p>Food with the name <b>"${category}"</b> was not found</p></center>
        `;
      } else {
        renderData({ datas: responseJson.meals, isSearch: true, filter: (isFilter ? category : null )});
      }
    }

  } catch (error) {
    console.error(error);
  }
}

// * --------------------------- END : Main Function -------------------------- */




// * ------------------------ START : Utility Function ------------------------ */
const getRandomRequest = async ({ isUpdate }) => {
  try {
    // ? Loop request for get more then 1 random food
    while (countFood < numRandomFood) {
      const response = await fetch(`${BASE_URL}/random.php`);
      const responseJson = await response.json();

      if (responseJson.error) {
        console.error(responseJson.message)
      } else {

        let twin = false;
        for (let i = 0; i < foodArray.length; i++) {
          // ? Check twin data
          if (responseJson.meals[0].idMeal === foodArray[i].idMeal) { twin = true; }
        }
        // ? Check if data is not twin
        if (!twin) {
          // ? Use the data
          foodArray.push(responseJson.meals[0]);
          countFood += 1;
        }
      }
    }
    if (isUpdate) {
      // ? Update IDB with new Data and same expired date
      idbGet().then(data => {
        idbUpdate({ id: "random", createDate: [data.createDate[0], data.createDate[1]], data: foodArray });
        countFood = 0;
      });
    } else {
      // ? Add new IDB with new Date for expired date
      const nowDate = new Date().getDate();
      const nowMonth = new Date().getMonth();
      idbAdd({ id: "random", createDate: [nowDate, nowMonth], data: foodArray });
      countFood = 0;
    }
    // ? Render data to HTML
    renderData({ datas: foodArray, isSearch: false, filter: null });

  } catch (error) {
    console.log(error);
  }

}
const renderData = ({ datas, isSearch, filter }) => {
  const foodList = document.querySelector('#render-food');
  foodList.innerHTML = '';
  const loader = document.querySelector('.loader');
  const btnShowMore = document.querySelector('.btn-show-more');
  loader.style.display = 'none';
  if (isSearch) {
    btnShowMore.style.display = 'none';
  } else {
    btnShowMore.style.display = 'flex';
  }
  for (let food of datas) {
    foodList.innerHTML += `
    <div class="list__child__card">
      <a href="/detail.html?id=${food.idMeal}&from=${window.location.hash.substr(1)}">
      <div class="wrap">
        <div
          class="picture"
          style="background-image: url(${food.strMealThumb});"
          loading="lazy"></div>
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
const renderFilterList = data => {

  const filterPlaceholder = document.querySelector(`#c`);
  const filterSection = document.querySelector('.list__filter');
  const loader = document.querySelector('.loader');
  const foodList = document.querySelector('#render-food');

  for (let i of data) {
    filterPlaceholder.innerHTML += `
    <div class="list__filter__group__item" id="${i.strCategory}">
    <img src="https://www.themealdb.com/images/Category/${i.strCategory}.png" alt="#">
    <p>${i.strCategory}</p>
    </div>
    `;
  }

  const filterItem = document.querySelectorAll('.list__filter__group__item');
  const filterStatus = document.querySelector('.filter-status-wrap');
  const btnShowMore = document.querySelector('.btn-show-more');

  filterItem.forEach(item => {
    item.addEventListener('click', () => {
      loader.style.display = 'flex'
      foodList.innerHTML = '';
      if (item.id === 'random') {
        getRandom();
        filterStatus.style.display = 'none';
      } else {
        searchByCategory({ category: item.id, isFilter: true });
        filterStatus.querySelector('.filter-status').innerHTML = `Filter : <span>${item.id}</span>`;
        filterStatus.style.display = 'block';
      }
      filterSection.classList.toggle('show');
      btnShowMore.style.display = 'none';
    });
  });
}
// * ------------------------- END : Utility Function ------------------------- */