// ─────────────────────────────────────────────────────────────
// content.js
//
// This file is injected into every webpage by Chrome.
// It listens for messages from popup.js and counts the words on the page and sends back the result
//
// This file has access to the webpage's DOM — that's how
// it can read the text and change how the page looks.
// ─────────────────────────────────────────────────────────────


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

  // ── word count ────────────────────────────────────────────
  if (message.action === "getWordCount") {

    // **FILL IN (get text from webpage)
    const text = document.body.innerText;;

    // split into words and remove empty strings
    const words = text.trim().split(/\s+/).filter(Boolean);

    // **FILL IN (count the number of words in the text )
    const wordCount = words.length;

    // **FILL IN
    // **HINT** average reading speed is ~200 words per minute
    // Math.ceil rounds up 
    const readTime = Math.ceil(wordCount / 200);

    // send the result back to popup.js
    sendResponse({ wordCount: wordCount, readTime: readTime });
  }


  // return true keeps the message channel open for sendResponse
  return true;

});
