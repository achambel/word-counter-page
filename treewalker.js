var nodeReject = {
  acceptNode: function(node) {
    if(!node.parentNode.nodeName.match(/SCRIPT|STYLE|CODE/))
      return NodeFilter.FILTER_ACCEPT;
  }
};

function treeWalker(ele) {
  var nodes = document.createTreeWalker(ele, NodeFilter.SHOW_TEXT, nodeReject, false);
  var text = [];
  regex = new RegExp(/^['"!@#$£%¢¬&*()\-_+=§`´{[^~\]}<,.>;:\/°?|\d]+|['"!@#$£%¢¬&*()\-_+=§`´{[^~\]}<,.>;:\/°?|\d]+$/g);

  while(node = nodes.nextNode()) {
    var words = node.data
                    .split(/\s/)
                    .map((str) => str.replace(regex, ''))
                    .filter((str) => !!str);

    text = text.concat(words);
  }
  return text;
}


var nodes = treeWalker(document.body);

var words = []

nodes.forEach( (text) => {
  var word = text.toLowerCase();

  var wordIndex = words.findIndex( (w) => w.word == word );

  if(wordIndex >= 0) {
    words[wordIndex].counter = words[wordIndex].counter + 1;
  }
  else {
    words.push({word: word, counter: 1});
  }

});

words = words.sort( (a, b) => b.counter - a.counter );

chrome.runtime.sendMessage({ words: words });
