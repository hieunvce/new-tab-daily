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
 * Logic:
 *
 * 1. Show the quote has been prepared, user will see the quote instantly.
 *    If this is the first time user opens the new tab, or the quote doesn't exist, show the default quote.
 * 2. Check the latest version of the quote data on the server
 * 3. Update the local version of the quote data (in Local Storage) if the local version is outdated
 * 4. Prepare the quote that will be shown on the next time user opens the new tab
 */
function getQuoteData() {
  // 1. Show the quote has been prepared, user will see the quote instantly
  // If this is the first time user opens the new tab, or the quote doesn't exist, show the default quote.
  let quote = getPreparedQuote();
  if (!quote) {
    quote = DEFAULT_QUOTE;
  }
  renderQuote(quote);

  // TODO: 2. Check the latest version of the quote data on the server
}
// const response = await fetch("/my/url");
// const data = await response.json();
ready(getQuoteData);
