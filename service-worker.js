importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox ? console.log("WorkBox is Success!") : console.error("WorkBox is Failed!");

workbox.precaching.precacheAndRoute([
  {url: "/", revision: "1"},
  {url: "/index.html", revision: "1"},
  {url: "/detail.html", revision: "2"},
  {url: "/src/components/app-nav.js", revision: "1"},
  {url: "/manifest.json", revision: "1"},
  {url: "/browserconfig.xml", revision: "1"},
  {url: "/favicon.ico", revision: "1"},
  {url: "/service-worker.js", revision: "1"},
  {url: "/src/idb/idb.js", revision: "1"},
  {url: "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js", revision: "1"},
  {url: "https://use.fontawesome.com/releases/v5.15.1/css/all.css", revision: "1"},
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

// api
workbox.routing.registerRoute(
  new RegExp("https://www.themealdb.com/api/json/v1/1/lookup.php"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'TheMealDB-Detail-API'
})
)


// image
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "images"
  })
);