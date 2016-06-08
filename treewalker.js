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

var words = {}

nodes.forEach( (word) => {
  var prop = word.toLowerCase();

  if(prop in words) {
    words[prop].count = words[prop].count + 1;
  }
  else {
    words[prop] = { count: 1 };
  }
});

chrome.runtime.sendMessage({ text: words });
