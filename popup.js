document.addEventListener('DOMContentLoaded', function() {
  console.log('loaded page at ' + new Date().toLocaleString());
});

chrome.runtime.onMessage.addListener(function(request, sender) {
  console.log(request.text)
});

window.onload = chrome.tabs.executeScript(null, {
    file: "treewalker.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      document.getElementById('messages').innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
});


function detectLanguage(text) {
  chrome.i18n.detectLanguage(text, function(result) {

    var outputLang = "Detected Language: ";
    var outputPercent = "Language Percentage: ";

    for(i = 0; i < result.languages.length; i++) {
      outputLang += result.languages[i].language + " ";
      outputPercent +=result.languages[i].percentage + " ";
    }

    document.getElementById("messages").innerHTML = outputLang + "\n" + outputPercent + "\nReliable: " + result.isReliable;
  });
}
