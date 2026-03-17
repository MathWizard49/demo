// ─────────────────────────────────────────────────────────────
// popup.js
//
// Runs inside the popup window.
// Gets tab info from Chrome, sends messages to content.js,
// and puts everything into the popup HTML using getElementById.
// ─────────────────────────────────────────────────────────────


// chrome.tabs.query finds the current active tab.
// Chrome passes it to our function as an array — we use tabs[0].

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const tab = tabs[0];

  // getElementById finds the element in popup.html with that id
  // and we set its text to the value we want to display
  // uses chrome.tabs (set up in manifest file) to get title

  document.getElementById("page-title").textContent = tab.title;

  // now do the same as the previous line to find the url
  //***** FILL IN******
  document.getElementById("page-url").textContent = tab.url;

  // ── ask content.js for the word count ────────────────────
  // sendMessage sends a message to content.js running on the page
  // content.js does the work and sends a response back

  chrome.tabs.sendMessage(tab.id, { action: "getWordCount" }, function (response) {

    // if the page couldn't be scanned, show n/a and stop
    if (!response) {
      document.getElementById("word-count").textContent = "n/a";
      document.getElementById("read-time").textContent  = "n/a";
      return;
    }

    // fill in the word count and reading time
    document.getElementById("word-count").textContent = response.wordCount;
    document.getElementById("read-time").textContent  = response.readTime;

  });

});

