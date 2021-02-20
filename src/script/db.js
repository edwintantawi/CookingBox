const dbPromised = idb.open("CookingBox", 1, function(upgradeDb){
  // START : RandomFood Store
  const randomFoodObjectStore = upgradeDb.createObjectStore("CookingBoxRandom", {
    keyPath: "id"
  });
  // END : RandomFood Store

  // START : Collection Store
  const collectionFoodObjectStore = upgradeDb.createObjectStore("CookingBoxCollections", {
    keyPath: "idMeal"
  });
  // END : Collection Store

  // START : Create Index
  randomFoodObjectStore.createIndex("id", "id", {unique: true});
  collectionFoodObjectStore.createIndex("idMeal", "idMeal", {unique: true});
  // END : Create Index
});

// START : Add Data
export const idbAdd = data =>{
  dbPromised
    .then(function(db){
      const tx = db.transaction('CookingBoxRandom', 'readwrite');
      const store = tx.objectStore('CookingBoxRandom');
      store.add(data);
      return tx.complete;
  })
};
// END : Add Data

// START : Add Data collections
export const idbAddCollections = data =>{
  dbPromised
    .then(function(db){
      const tx = db.transaction('CookingBoxCollections', 'readwrite');
      const store = tx.objectStore('CookingBoxCollections');
      store.add(data);
      return tx.complete;
  })
};
// END : Add Data collections

// START : Delete Data
export const idbDelete = id => {
  dbPromised
  .then(function(db){
    const tx = db.transaction('CookingBoxRandom', 'readwrite');
    const store = tx.objectStore('CookingBoxRandom');
    store.delete(id);
    return tx.complete;
  });
}
// END : Delete Data

// START : Delete Data collections
export const idbDeleteCollections = id => {
  dbPromised
  .then(function(db){
    const tx = db.transaction('CookingBoxCollections', 'readwrite');
    const store = tx.objectStore('CookingBoxCollections');
    store.delete(id);
    return tx.complete;
  });
}
// END : Delete Data collections

// START : Get Data
export const idbGet = () =>{
  return new Promise((resolve, reject) => {
    dbPromised
    .then(function(db){
      const tx = db.transaction('CookingBoxRandom', 'readonly');
      const store = tx.objectStore('CookingBoxRandom');
      return store.getAll();
    })
    .then(function(randomList){
      if( randomList ){
        randomList.forEach(function(random){
          if (random) {
            resolve(random)
          }
        });
      }
      reject("empty")
    })
  });
}
// END : Get Data

// START : Get Data collections
export const idbGetCollection = (idMeal) =>{
  return new Promise((resolve, reject) => {
    dbPromised
    .then(function(db){
      const tx = db.transaction('CookingBoxCollections', 'readonly');
      const store = tx.objectStore('CookingBoxCollections');
      return store.getAll();
    })
    .then(function(meals){
      if( meals ){
        if( idMeal ){
          meals.forEach(meal => {
            if( meal.idMeal === idMeal ){
              resolve("meal is ready");
            }
          });
        }else if( meals.length > 0 ){
          resolve(meals);
        }
      }
      
      reject("empty")
    })
  });
}
// END : Get Data collections

// START : Update Data
export const idbUpdate = data => {
  dbPromised
  .then(function(db){
    const tx = db.transaction('CookingBoxRandom', 'readwrite');
    const store = tx.objectStore('CookingBoxRandom');
    store.put(data);
    return tx.complete;
  });
};
// END : Update Data

// const getSavedBookmark = () => {
//   dbPromised
//     .then(function(db){
//       const tx = db.transaction('standings', 'readwrite');
//       const store = tx.objectStore('standings');
//       return store.getAll();
//     }).then(function(bookmarkItems){
//       // console.log(bookmarkItems)
//       getBookmarks(bookmarkItems);
//     })
// }

// const removeBookmark = id =>{
//   const btnBookmark = document.querySelector(`[data-id='${id}']`);
//   btnBookmark.innerHTML = "bookmark_border"
// }

// // toast
// const showToast = text => {
//   M.toast({
//     html: text
//   });
// }