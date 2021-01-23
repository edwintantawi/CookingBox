class Footer extends HTMLElement{
  constructor(){
    super();
    this.date = this.systemDate();
  }
  connectedCallback(){
    this.render();
  }

  systemDate = () => {
    const firstYears = 2021;
    const nowYears =  new Date().getFullYear();

    if( firstYears === nowYears ){
      return nowYears;
    } else {
      return `${firstYears} - ${nowYears}`;
    }
  }

  render(){
    this.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <!-- ${'START : Footer Brand'} -->
            <img src="/src/assets/logo/logo-min.svg" alt="CookingBox" class="footer__brand">
            <!-- ${'END : Footer Brand'} -->
            <!-- ${'END : Footer Copyright'} -->
            <p class="footer__copyright">
            copyright &copy; <span class="footer__copyright__years">${this.date}</span> <span class="word-brand">CookingBox</span>
            </p>
            <!-- ${'END : Footer Copyright'} -->
          </div>
        </div>
      </div>
    </footer>
    `;
  }
}

customElements.define('app-footer', Footer);