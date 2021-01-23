class Navbar extends HTMLElement{
  connectedCallback(){
    this.render();
  }

  render(){
    this.innerHTML = `
      <!-- ${'START : Navigation Bae'} -->
      <nav class="navbar">
        <div class="container">
          <!-- ${'START : Nav Brand'} -->
          <a href="/" class="navbar__brand">
          <img src="src/assets/logo/logo-full.svg" alt="CookingBox">
          </a>
          <!-- ${'END : Nav Brand'} -->
      
          <!-- ${'START : Navigation Desktop'} -->
          <div class="navbar__navigation d-none d-md-block">
            <a href="#home" class="navlink active">Home</a>
            <a href="#collections" class="navlink">Collections</a>
            <a href="#about" class="navlink">About</a>
          </div>
          <!-- ${'END : Navigation Desktop'} -->
        </div>
      </nav>
      <!-- ${'END : Navigation Bar'} -->

      <!-- ${'START : Navigation Mobile'} -->
      <div class="navbar__mobile__navigation d-block d-md-none" >
        <div class="wrap">
          <a href="#collections" class="navlink"><i class="fas fa-book"></i>Collections</a>
          <a href="#home" class="navlink active"><i class="fas fa-utensils"></i>Home</a>
          <a href="#about" class="navlink"><i class="fas fa-address-card"></i>About</a>
        </div>
      </div>
      <!-- ${'END : Navigation Mobile'} -->
    `;
  }
}

customElements.define("app-nav", Navbar);