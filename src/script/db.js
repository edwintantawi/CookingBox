// const dbPromised = idb.open("CookingBox", 1, function(upgradeDb){
//   const standingsObjectStore = upgradeDb.createObjectStore("CookingBoxRandom", {
//     keyPath: "idMeal"
//   });
//   standingsObjectStore.createIndex("idMeal", "idMeal", {unique: false});
// });

// // save random list
// export const saveRandomList = random =>{
//   dbPromised
//     .then(function(db){
//       const tx = db.transaction('CookingBoxRandom', 'readwrite');
//       const store = tx.objectStore('CookingBoxRandom');
//       store.add(random);
//       return tx.complete;
//   })
// };

// const removeFromBookmark = id => {
//   dbPromised
//     .then(function(db){
//       const tx = db.transaction('standings', 'readwrite');
//       const store = tx.objectStore('standings');
//       store.delete(id);
//       return tx.complete;
//     });
// }

// const checkBookmarked = id =>{
//   dbPromised
//     .then(function(db){
//       const tx = db.transaction('standings', 'readonly');
//       const store = tx.objectStore('standings');
//       return store.getAll();
//     })
//     .then(function(standings){
//       standings.forEach(function(standing){
//         if(standing.team.id == id){
//           const btnBookmark = document.querySelector(`[data-id='${id}']`);
//           btnBookmark.innerHTML = "bookmark"
//         }
 
//       });
//     })
// }

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