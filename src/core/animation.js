import "@/assets/view.css";
import { addClass } from "../utils/toolFunction";

export function animation(el) {
  addClass(el, "animationView");
  return {
    async statement(key, variable) {
      let dom = document.createElement("div");
      dom.setAttribute("class", "variable");
      dom.innerHTML = `
				<div class="data" style="background-color: pink;"></div>
				<div class="name">${variable}</div>
			`;
      el.appendChild(dom);
    },
    async assignment() {},
    async output() {},
  };
}
