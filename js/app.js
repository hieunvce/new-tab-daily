/**
 * Alternative to $(document).ready(function () {});
 *
 * Reference: https://youmightnotneedjquery.com/
 *
 * @param {Function} fn Function will be called when the document is ready
 */
function ready(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

/**
 * Get random integer number in range from min to max
 *
 * @param {number} min Min
 * @param {number} max Max
 * @returns
 */
function randomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * A quote
 * @typedef {{content: string, author: string, contentEn: string, authorEn: string}} Quote
 */

/**
 * @const {@link Quote}
 */
const DEFAULT_QUOTE = {
  content:
    "...Khi chúng ta sống đẹp với đời, sống tốt với người thì sẽ được hai điều. Thứ nhất, ta gieo tạo được phước lành. Thứ hai, ta đem tiếng khen đến cho Thầy mình, cho Đức Phật tôn kính...",
  contentEn:
    "...When we live a virtuous life and treat people with great kindness, we will have two things. First, we create good karma. Second, we offer praise to our revered Buddha and our master...",
  author: "Ở HIỀN GẶP LÀNH | Trích trang 44 | TT. TS. Thích Chân Quang",
  authorEn:
    "ONE GOOD TURN DESERVES ANOTHER | Quote p. 94 | Ven. Phd Thich Chan Quang",
};

const DEFAULT_BG_URL = "/images/bg1.jpeg";

/**
 * Get prepared quote from Local Storage
 *
 * @return {Quote | null}
 */
function getPreparedQuote() {
  const quoteStr = localStorage.getItem("preparedQuote");
  if (quoteStr) {
    return JSON.parse(quoteStr);
  }
  return null;
}

/**
 * Render a quote to UI
 *
 * @param {Quote} quote
 */
function renderQuote(quote) {
  const quoteElement = document.createElement("simple-quote");
  quoteElement.setAttribute("quote", quote.content);
  quoteElement.setAttribute("author", quote.author);
  quoteElement.setAttribute("quote-en", quote.contentEn);
  quoteElement.setAttribute("author-en", quote.authorEn);
  document.getElementById("quote").appendChild(quoteElement);
}

/**
 * Get prepared background URL from Local Storage
 */
function getPreparedBgUrl() {
  const bgUrl = localStorage.getItem("bgUrl");
  return bgUrl;
}

/**
 * Render background
 *
 * @param {string} url
 */
function renderBackground(url) {
  document.getElementById(
    "main-container"
  ).style.backgroundImage = `url("${url}")`;
}

/**
 * Logic:
 *
 * 1. Show the quote has been prepared, user will see the quote instantly.
 *    If this is the first time user opens the new tab, or the quote doesn't exist, show the default quote.
 * 2. Check the latest version of the quote data on the server
 * 3. Update the local version of the quote data (in Local Storage) if the local version is outdated
 * 4. Prepare the quote that will be shown on the next time user opens the new tab
 */
function main() {
  // 1. Show the quote has been prepared, user will see the quote instantly
  // If this is the first time user opens the new tab, or the quote doesn't exist, show the default quote.
  let quote = getPreparedQuote();
  if (!quote) {
    quote = DEFAULT_QUOTE;
  }
  renderQuote(quote);

  let bgUrl = getPreparedBgUrl();
  if (!bgUrl) {
    bgUrl = DEFAULT_BG_URL;
  }
  renderBackground(bgUrl);

  // 2. Check the latest version of the quote data on the server
  fetch("https://new-tab-daily.vercel.app/db-version.json").then(
    (versionResponse) => {
      versionResponse.json().then((versionData) => {
        const remoteVersion = versionData;

        // Get local db version from local storage
        let localVersion = null;
        const localVersionStr = localStorage.getItem("version");
        if (localVersionStr) {
          localVersion = JSON.parse(localVersionStr);
        }

        // Get local db from local storage
        let localDb = null;
        const localDbStr = localStorage.getItem("db");
        if (localDbStr) {
          localDb = JSON.parse(localDbStr);
        }

        // 3. Update the local version of the quote data (in Local Storage) if the local version is outdated
        if (
          localVersion === null ||
          localVersion.version !== remoteVersion.version ||
          localDb === null
        ) {
          fetch("https://new-tab-daily.vercel.app/db.json").then(
            (dbResponse) => {
              dbResponse.json().then((dbData) => {
                localStorage.setItem("version", JSON.stringify(versionData));
                localStorage.setItem("db", JSON.stringify(dbData));

                // 4. Prepare the quote that will be shown on the next time user opens the new tab
                const quotes = dbData.data;
                const ramdomIndex = randomIntInRange(0, quotes.length - 1);
                localStorage.setItem(
                  "preparedQuote",
                  JSON.stringify(quotes[ramdomIndex])
                );
              });
            }
          );
        } else {
          // 4. Prepare the quote that will be shown on the next time user opens the new tab
          const quotes = localDb.data;
          const ramdomIndex = randomIntInRange(0, quotes.length - 1);
          localStorage.setItem(
            "preparedQuote",
            JSON.stringify(quotes[ramdomIndex])
          );
        }
      });
    }
  );

  // Prepare background URL
  const randomBgIndex = randomIntInRange(1, 20);
  localStorage.setItem("bgUrl", `/images/bg${randomBgIndex}.jpeg`);
}

ready(main);
