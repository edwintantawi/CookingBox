class Navbar extends HTMLElement{
  connectedCallback(){
    this.render();
  }
  render(){
    this.innerHTML = `
        <nav class="navbar">
        <div class="container">
          <!-- brand -->
          <a href="/" class="navbar__brand">
            <img src="src/assets/logo/logo-full.svg" alt="CookingBox">
          </a>
          <!-- toggle -->
          <!-- <div id="menu-toggle" class="navbar__toggle d-lg-none">
            <span class="line-toggle"></span>
            <span class="line-toggle"></span>
            <span class="line-toggle"></span>
          </div> -->
          <!-- navigation -->
          <div class="navbar__navigation d-none d-md-block">
            <a href="#home" class="navlink active">Home</a>
            <!-- <a href="#searchby" class="navlink toSearch">Search By</a> -->
            <a href="#collections" class="navlink">Collections</a>
            <a href="#about" class="navlink">About</a>
          </div>
        </div>
      </nav>
      <!-- darkness -->
      <!-- mobile navigation -->
    
        <div class="navbar__mobile__navigation d-block d-md-none" >
          <div class="wrap">
            <a href="#collections" class="navlink"><i class="fas fa-book"></i>Collections</a>
            <a href="#home" class="navlink active"><i class="fas fa-utensils"></i>Home</a>
            <a href="#about" class="navlink"><i class="fas fa-address-card"></i>About</a>
          </div>
        </div>
    `;
  }
}

customElements.define("app-nav", Navbar);