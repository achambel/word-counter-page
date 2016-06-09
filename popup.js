document.addEventListener('DOMContentLoaded', function() {
  console.log('loaded page at ' + new Date().toLocaleString());
});

chrome.runtime.onMessage.addListener(function(request, sender) {
  var content = document.getElementById('content');
  var totalWord = request.words.length;
  document.getElementById('messages').innerHTML = `${chrome.i18n.getMessage('wordsFound')}: <span class='ui teal circular label'>${totalWord}</span>`;
  document.getElementById('word').textContent = chrome.i18n.getMessage('word');
  document.getElementById('qty').textContent = chrome.i18n.getMessage('qty');
  var tbody = document.querySelector('#word-table tbody');

  request.words.forEach( (words) => {
    var tr = document.createElement('tr');
    var tdWord = document.createElement('td');
    var label = document.createElement('span');
    var tdCounter = document.createElement('td');
    var tdPercent = document.createElement('td');

    label.textContent = words.word;
    label.classList.add('ui', 'small', 'blue', 'label');
    tdWord.appendChild(label);
    tdCounter.textContent = words.counter;
    tdPercent.textContent = `${((words.counter / totalWord) * 100).toLocaleString()}%`;

    tr.appendChild(tdWord);
    tr.appendChild(tdCounter);
    tr.appendChild(tdPercent);

    tbody.appendChild(tr);

  });
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
