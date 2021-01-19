
const dbPromised = idb.open("CookingBox", 1, function(upgradeDb){
  const randomFoodObjectStore = upgradeDb.createObjectStore("CookingBoxRandom", {
    keyPath: "randomId"
  });
  const collectionFoodObjectStore = upgradeDb.createObjectStore("CookingBoxCollection", {
    keyPath: "idMeal"
  });
  randomFoodObjectStore.createIndex("randomId", "randomId", {unique: true});
  collectionFoodObjectStore.createIndex("idMeal", "idMeal", {unique: true});
});

// save random list
export const saveRandomList = randomList =>{
  dbPromised
    .then(function(db){
      const tx = db.transaction('CookingBoxRandom', 'readwrite');
      const store = tx.objectStore('CookingBoxRandom');
      store.add(randomList);
      return tx.complete;
  })
};

export const resetRandomList = id => {
  dbPromised
    .then(function(db){
      const tx = db.transaction('CookingBoxRandom', 'readwrite');
      const store = tx.objectStore('CookingBoxRandom');
      store.delete(id);
      return tx.complete;
    });
}

export const checkRandomList = () =>{
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
          //  callback(random.data);
           if (random) {
             resolve(random)
           }
  
        });
      }
      reject("empty")
    })
  });
}

export const updateRandomFoodList = data => {
  dbPromised
    .then(function(db){
      const tx = db.transaction('CookingBoxRandom', 'readwrite');
      const store = tx.objectStore('CookingBoxRandom');
      store.put(data);
      return tx.complete;
    });
};

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