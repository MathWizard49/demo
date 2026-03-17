// ─────────────────────────────────────────────────────────────
// content.js
//
// This file is injected into every webpage by Chrome.
// It listens for messages from popup.js and either:
//   - counts the words on the page and sends back the result
//   - flips the page upside down
//
// This file has access to the webpage's DOM — that's how
// it can read the text and change how the page looks.
// ─────────────────────────────────────────────────────────────

// keep track of whether the page is currently flipped
let flipped = false;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

  // ── word count ────────────────────────────────────────────
  if (message.action === "getWordCount") {

    // document.body.innerText gives us all visible text on the page
    const text = document.body.innerText;

    // split into words and remove empty strings
    const words = text.trim().split(/\s+/).filter(Boolean);

    // count the words
    const wordCount = words.length;

    // average reading speed is ~200 words per minute
    // Math.ceil rounds up so we never show 0 min read
    const readTime = Math.ceil(wordCount / 200);

    // send the result back to popup.js
    sendResponse({ wordCount: wordCount, readTime: readTime });
  }


  // return true keeps the message channel open for sendResponse
  return true;

});
