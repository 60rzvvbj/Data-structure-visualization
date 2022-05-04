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

export function getDoubleRandom(l, r) {
  return l + Math.random() * (r - l + 1);
}

export function getIntRandom(l, r) {
  return parseInt(getDoubleRandom(l, r));
}

export function randomColor(l, r) {
  return (
    "rgb(" +
    getIntRandom(l, r) +
    "," +
    getIntRandom(l, r) +
    "," +
    getIntRandom(l, r) +
    ")"
  );
}
