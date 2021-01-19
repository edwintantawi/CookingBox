// WorkBox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox ? console.log("WorkBox is Success!") : console.error("WorkBox is Failed!");

workbox.precaching.precacheAndRoute([
  {url: "/", revision: "1"},
  {url: "/index.html", revision: "1"},
  {url: "/manifest.json", revision: "1"},
  {url: "/browserconfig.xml", revision: "1"},
  {url: "/favicon.ico", revision: "1"},
  {url: "/detail.html", revision: "1"},
]);

// pages
workbox.routing.registerRoute(
  new RegExp('/src/pages/'),
  workbox.strategies.staleWhileRevalidate(
    {cacheName: 'pages'}
  )
);

workbox.routing.registerRoute(
  /\.(?:css|js)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "style and script",
  })
)

// fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'fonts',
  })
);

// api
// workbox.routing.registerRoute(
//   new RegExp("https://www.themealdb.com/"),
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: 'TheMealDB-API'
// })
// )
// workbox.routing.registerRoute(
//   new RegExp("/src/script/foodDatas.js"),
//   workbox.strategies.cacheFirst({
//     cacheName: 'TheMealDB-API'
// })
// )

// image
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst()
);