importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox ? console.log("WorkBox is Success!") : console.error("WorkBox is Failed!");

self.addEventListener('install', event => {
  self.skipWaiting();
});

workbox.precaching.precacheAndRoute([
  {url: "/", revision: "3"},
  {url: "/index.html", revision: "5"},
  {url: "/detail.html", revision: "4"},
  {url: "/src/components/app-nav.js", revision: "3"},
  {url: "/src/components/app-footer.js", revision: "3"},
  {url: "/manifest.json", revision: "3"},
  {url: "/browserconfig.xml", revision: "3"},
  {url: "/favicon.ico", revision: "3"},
  {url: "/src/idb/idb.js", revision: "3"},
  {url: "https://use.fontawesome.com/releases/v5.15.1/css/all.css", revision: "2"},
],{
  ignoreUrlParametersMatching: [/.*/],
});

// pages
workbox.routing.registerRoute(
  /\.(?:html)$/,
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

// api detail
workbox.routing.registerRoute(
  new RegExp("https://www.themealdb.com/api/json/v1/1/lookup.php"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'TheMealDB-Detail-API'
})
);

// api filter list
workbox.routing.registerRoute(
  new RegExp("https://www.themealdb.com/api/json/v1/1/list.php"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'TheMealDB-Filter-API'
})
);
// api filter data
workbox.routing.registerRoute(
  new RegExp("https://www.themealdb.com/api/json/v1/1/filter.php"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'TheMealDB-Filter-data-API'
})
);

// api filter images
workbox.routing.registerRoute(
  new RegExp("https://www.themealdb.com/images/Category"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'TheMealDB-Images-API'
})
);


// image
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "images"
  })
);