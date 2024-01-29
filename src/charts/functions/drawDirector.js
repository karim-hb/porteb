import { svgNS } from "../initials.js";
import insertSymbol from "./insertSymbol.js"
// یک دایره کوچک به‌عنوان نقطه نشانگر موقعیت مجاز مکان‌نما تعریف میکنیم
export default function drawDirector(container, id, symbol) {
  const svg = document.createElementNS(svgNS, "svg");
  // svg.setAttribute("id", id);
  svg.setAttribute("viewBox", "-5 -5 20 20");
  svg.setAttribute("x", -5);
  svg.setAttribute("y", -5);
  svg.setAttribute("width", 20);

  svg.setAttribute("height", 20);


  let circle = document.createElementNS(svgNS, "circle");
  circle.setAttribute("id", id);

  circle.setAttribute("stroke", "black");
  circle.setAttribute("stroke-width", "1");
  //circle.setAttribute("fill", "transparent");
  circle.setAttribute("cx", "0");
  circle.setAttribute("cy", "0");
  circle.setAttribute("r", "0.5");
  container.appendChild(circle);
  // container.appendChild(svg);

  // سمبل راهنما مطابق با سمبل انتخاب شده کنار دایره راهنما
  // insertSymbol(svg, "R_AC_M", 0, 0, 10, 10 , "")
}
