class SimpleClock extends HTMLElement {
  static styles = `
        <style>
            #clock {
                color: rgb(17, 17, 17);
                white-space: break-spaces;
                line-height: 104px;
                letter-spacing: 4px;
                font-size: 104px;
                font-family: system-ui;
            }
        </style>
    `;

  get template() {
    return `
            ${SimpleClock.styles}
            <div id='clock'></div>
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
    const setTime = () => {
      const localTimeString = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      this.shadowRoot.getElementById("clock").innerHTML = localTimeString;
    };
    setTime();
    setInterval(() => {
      setTime();
    }, 1000);
  }
}

customElements.define("simple-clock", SimpleClock);
