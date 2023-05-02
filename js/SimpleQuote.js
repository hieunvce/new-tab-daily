class SimpleQuote extends HTMLElement {
  static styles = `
        <style>
            .quote-block-container {
                padding: 1em;
                backdrop-filter: blur(16px) saturate(180%);
                -webkit-backdrop-filter: blur(16px) saturate(180%);
                background-color: rgba(255, 255, 255, 0.75);
                border-radius: 12px;
                border: 1px solid rgba(209, 213, 219, 0.3);
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

  static renderQuote(quote, author) {
    const quoteWithBr = quote.replace(/\n/g,"<br/>")
    return `
      <div class="quote-block-container">
          <div id='quote' class="quote">${quoteWithBr}</div>
          <div class="author-container">
              <div id='author' class="author">${author}</div>
          </div>
      </div>
    `
  }

  get template() {
    const quote = this.quote;
    return `
            ${SimpleQuote.styles}
            ${quote.quote ? SimpleQuote.renderQuote(quote.quote, quote.author): ""}
            <div style="height: 2rem"></div>
            ${quote.quoteEn ? SimpleQuote.renderQuote(quote.quoteEn, quote.authorEn): ""}
        `;
  }

  get quote() {
    return {
      quote: this.getAttribute("quote"),
      author: this.getAttribute("author"),
      quoteEn: this.getAttribute("quote-en"),
      authorEn: this.getAttribute("author-en"),
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
