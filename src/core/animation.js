import "@/assets/view.css";
import { addClass, randomColor } from "../utils/toolFunction.js";
import { boxShadow, textShadow, scale } from "./animation-atom.js";

export function animation(el) {
  addClass(el, "animationView");
  addClass(el, "scroll");
  let doms = {};
  return {
    async statement(key, variable) {
      let dom = document.createElement("div");
      dom.setAttribute("class", "variable");
      dom.innerHTML = `
				<div class="data" style="background-color: ${randomColor(30, 80)};">
					<span></span>
				</div>
				<div class="name">${variable}</div>
			`;
      el.appendChild(dom);
      doms[variable] = dom;
    },
    async assignment(variable, value, timing) {
      console.log(timing);
      let dom = doms[variable];
      let data = dom.querySelector(".data span");
      if (timing == "start") {
        data.innerText = value;
      }
      return new Promise(function (resolve) {
        scale(
          data,
          {
            number: 60,
            max: 2,
            interval: 20,
            middle: () => {
              if (timing == "middle") {
                data.innerText = value;
              }
            },
          },
          resolve
        );
      });
    },
    async output() {},
    async read(variable) {
      let dom = doms[variable];
      let data = dom.querySelector(".data");
      return new Promise(function (resolve) {
        boxShadow(
          data,
          {
            number: 40,
            color: "#fff",
            interval: 20,
          },
          resolve
        );
      });
    },
  };
}
