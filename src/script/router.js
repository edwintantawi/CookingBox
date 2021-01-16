import { renderPage } from './action.js';
// get route
let route = window.location.hash.substr(1) || 'home';
renderPage(route);


