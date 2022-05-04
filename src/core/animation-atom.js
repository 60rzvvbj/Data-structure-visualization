export function boxShadow(dom, options, callback) {
  let number = options.number;
  let color = options.color;
  let interval = options.interval;

  let count = 0;
  let timer = setInterval(function () {
    count++;
    dom.style.boxShadow = `0px 0px ${
      number / 2 - Math.abs(count - number / 2)
    }px 0px ${color}`;
    if (count == number) {
      clearInterval(timer);
      callback();
    }
  }, interval);
}

export function textShadow(dom, options, callback) {
  let number = options.number;
  let color = options.color;
  let interval = options.interval;

  let count = 0;
  let timer = setInterval(function () {
    count++;
    dom.style.textShadow = `0px 0px ${
      number / 2 - Math.abs(count - number / 2)
    }px ${color}`;
    if (count == number) {
      clearInterval(timer);
      callback();
    }
  }, interval);
}

// export function fontSize(dom, options, callback) {
//   let number = 100;
//   let max = options.max;
//   let interval = options.interval;

//   let count = 0;
//   let timer = setInterval(function () {
//     count++;
//     dom.style.transform = `scale(${
//       ((number / 2 - Math.abs(count - number / 2)) / (number / 2)) * (max - 1) +
//       1
//     })`;
//     if (count == number) {
//       clearInterval(timer);
//       callback();
//     }
//   }, interval);
// }

export function scale(dom, options, callback) {
  let number = options.number;
  let max = options.max;
  let interval = options.interval;

  let count = 0;
  let timer = setInterval(function () {
    count++;
    dom.style.transform = `scale(${
      ((number / 2 - Math.abs(count - number / 2)) / (number / 2)) * (max - 1) +
      1
    })`;
    if (count == number / 2) {
      options.middle && options.middle();
    }
    if (count == number) {
      clearInterval(timer);
      callback();
    }
  }, interval);
}
