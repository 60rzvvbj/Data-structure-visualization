export function addClass(node, theClass) {
  if (node && theClass) {
    var str = node.getAttribute("class");
    if (str) {
      var arr = str.split(" ");
      var res = "";
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == theClass) {
          return node;
        }
        res += arr[i] + " ";
      }
      res += theClass;
      node.setAttribute("class", res);
    } else {
      node.setAttribute("class", theClass);
    }
  }
  return node;
}
