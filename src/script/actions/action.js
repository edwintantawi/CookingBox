import { navLink, navLinkMobile, footer } from '../dom.js';
import { renderPage } from '../router.js';

// ? Link Route
navLink.forEach(link => {
  link.addEventListener('click', () => {
    const linkRoute = link.getAttribute('href').substr(1); 
    renderPage(linkRoute);
    linkState(linkRoute);
    footer.style.display = 'block';
  });
});

// ? Active link state
export function linkState(route){
  navLink.forEach(link => {
    if( link.getAttribute('href').substr(1) === route ){
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}