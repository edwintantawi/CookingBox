// WorkBox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox ? console.log("WorkBox is Success!") : console.error("WorkBox is Failed!");

workbox.precaching.precacheAndRoute([
  // {url: "/", revision: "1"},
  // {url: "/index.html", revision: "1"},
  // {url: "/manifest.json", revision: "1"},
]);