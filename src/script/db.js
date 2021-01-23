const dbPromised = idb.open("CookingBox", 1, function(upgradeDb){
  // START : RandomFood Store
  const randomFoodObjectStore = upgradeDb.createObjectStore("CookingBoxRandom", {
    keyPath: "id"
  });
  // END : RandomFood Store

  // START : Collection Store
  const collectionFoodObjectStore = upgradeDb.createObjectStore("CookingBoxCollection", {
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