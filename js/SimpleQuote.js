class SimpleQuote extends HTMLElement {
  static styles = `
        <style>
            // CSS here
        </style>
    `;

  get template() {
    return `
            ${SimpleQuote.styles}
            <div id='quote'></div>
        `;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.template;
    this.init();
  }

  init() {
    const quote = "Lorem ipsum";
    this.shadowRoot.getElementById('quote').innerText = quote;
  }
}

customElements.define('simple-quote', SimpleQuote)
