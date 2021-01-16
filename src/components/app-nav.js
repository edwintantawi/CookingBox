class Navbar extends HTMLElement{
  connectedCallback(){
    this.render();
  }
  render(){
    this.innerHTML = `
    <h1>Navbar</h1>
    `;
  }
}

customElements.define("app-nav", Navbar);