import { mobileNav, toggler, navLink, mobileLink, darkness, body } from './dom.js';
import { renderPage, route } from './router.js';
// navbar toggle
toggler.addEventListener('click', ()=>{
  changeState();
});

// navigation link
navLink.forEach(link => {
  link.addEventListener('click', () => {
    const linkRoute = link.getAttribute('href').substr(1); 
    switch(link.textContent){
      case 'Home':
        renderPage(linkRoute);
        linkState('home');
        break;
        case 'Search By':
        renderPage('home');
        linkState('home');
        break;
        case 'Collections':
          console.log("im go")
        renderPage(linkRoute);
        linkState('collections');
        break;
        case 'About':
        renderPage(linkRoute);
        linkState('about');
        break;
      default:
        break;
    }
  });
});

// onload active link state
linkState(route);

// active link
function linkState(route){
  navLink.forEach(link => {
    console.log(link.getAttribute('href').substr(1))
    if( link.getAttribute('href').substr(1) === route ){
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// mobile navigation link
mobileLink.forEach(link => {
  link.addEventListener('click', () => {
    changeState();
  });
});

function changeState(){
  toggler.classList.toggle('change');
  mobileNav.classList.toggle('show');
  darkness.classList.toggle('show');
  body.classList.toggle('stuck');
}
// on scroll smallest navbar in desktop
// document.addEventListener('scroll', () => {
//   const position = window.pageYOffset;

//   if( position > 200 ){
//     navbar.classList.add('smallest');
//   } else {
//     navbar.classList.remove('smallest')
//   }

// });