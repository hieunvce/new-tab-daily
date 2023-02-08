class SimpleQuote extends HTMLElement {
  static styles = `
        <style>
            .quote-block-container {
                padding: 1em;
                border: 1px solid #222222;
            }
            .quote {
                font-size: 1.25em;
            }
            .author-container {
                margin-top: 0.5em;
                text-align: right;
                display: flex;
                justify-content: flex-end;
            }
            .author {
                width: fit-content;
                padding: 0.25em 0 0.25em 0.5em;
                border-left: 1px solid hsl(0deg 0% 32%);
                color: hsl(0deg 0% 32%);
            }
            
        </style>
    `;

  get template() {
    const quote = this.quote;
    return `
            ${SimpleQuote.styles}
            <div class="quote-block-container">
                <div id='quote' class="quote">"${quote.quote}"</div>
                <div class="author-container">
                    <div id='author' class="author">${quote.author}</div>
                </div>
            </div>
            <hr/>
            <div class="quote-block-container">
                <div id='quote-en' class="quote">"${quote.quoteEn}"</div>
                <div class="author-container">
                    <div id='author-en' class="author">${quote.authorEn}</div>
                </div>
            </div>
        `;
  }

  get quote() {
    return {
      quote: this.getAttribute("quote") || "",
      author: this.getAttribute("author") || "",
      quoteEn: this.getAttribute("quote-en") || "",
      authorEn: this.getAttribute("author-en") || "",
    };
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.template;
  }
}

customElements.define("simple-quote", SimpleQuote);
