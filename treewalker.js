var nodeReject = {
  acceptNode: function(node) {
    if(!node.parentNode.nodeName.match(/SCRIPT|STYLE|CODE/))
      return NodeFilter.FILTER_ACCEPT;
  }
};

function treeWalker(ele) {
  var nodes = document.createTreeWalker(ele, NodeFilter.SHOW_TEXT, nodeReject, false);
  var text = []
  while(node = nodes.nextNode()) {
    text = text.concat(node.data.split(/\s/));
  }
  return text;
}


var nodes = treeWalker(document.body);

chrome.runtime.sendMessage({ text: nodes });
