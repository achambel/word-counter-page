var nodeReject = {
  acceptNode: function(node) {
    if(!node.parentNode.nodeName.match(/SCRIPT|STYLE|CODE/))
      return NodeFilter.FILTER_ACCEPT;
  }
};

function treeWalker(ele) {
  var nodes = document.createTreeWalker(ele, NodeFilter.SHOW_TEXT, nodeReject, false);
  var text = [];
  regex = new RegExp(/['"!@#$£%¢¬&*\(\)-_+=§`´{[^~\]}<,.>;:\\/°?|]+$/g);

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

chrome.runtime.sendMessage({ text: nodes });
