// وارد کردن داده‌های سراسری
import { r, svgNS } from "../initials.js";

import insertSymbol from "./insertSymbol.js";

// رسم پنل سمبل ها

export default function drawSymbolPanel(container, x, y, id) {
  const w = 280;
  const h = 70;
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("id", id);
  svg.setAttribute("width", w);
  svg.setAttribute("height", h);
  svg.setAttribute("viewBox", "-6 -6 48 12");
  svg.setAttribute("style", "border: 1px solid blue; user-select: none;");

  let dx = 12
  // let dy = 5;
  // x += dx;
  // y += dy;
  x = 0;
  y = 0;
  // let dx = 0,
  //   dy = 0;

  switch (container.id[0]) {
    case "R":
      insertSymbol(svg, "R_AC", x, y, 12, 12);
      //draw_R_AC(svg, x, y);
      wrapperSquare(svg, x, y, "R_AC", "green");

      // dx *= 2;
      x += dx;
      insertSymbol(svg, "R_BC", x, y, 12, 12);
      //draw_R_BC(svg, x, y);
      wrapperSquare(svg, x, y, "R_BC");

      x += dx;
      insertSymbol(svg, "R_AC_M", x, y, 12, 12);
      //draw_R_AC_M(svg, x, y);
      wrapperSquare(svg, x, y, "R_AC_M");

      x += dx;
      insertSymbol(svg, "R_BC_M", x, y, 12, 12);
      //draw_R_BC_M(svg, x, y);
      wrapperSquare(svg, x, y, "R_BC_M");
      break;
    case "L":
      insertSymbol(svg, "L_AC", x, y, 12, 12);
      //draw_L_AC(svg, x, y);
      wrapperSquare(svg, x, y, "L_AC", "green");

      // dx *= 2;
      x += 12;
      insertSymbol(svg, "L_BC", x, y, 12, 12);
      //draw_L_BC(svg, x, y);
      wrapperSquare(svg, x, y, "L_BC");

      x += 12;
      insertSymbol(svg, "L_AC_M", x, y, 12, 12);
      //draw_L_AC_M(svg, x, y);
      wrapperSquare(svg, x, y, "L_AC_M");

      x += 12;
      insertSymbol(svg, "L_BC_M", x, y, 12, 12);
      //draw_L_BC_M(svg, x, y);
      wrapperSquare(svg, x, y, "L_BC_M");
      break;

    default:
      break;
  }
  container.appendChild(svg);
}

// رسم مربع احاطه‌کننده سمبل پنل سمبل‌ها - wrapperSquare

function wrapperSquare(svg, x, y, id, color = "transparent") {
  // const offset = 1.5;
  // const a = r + offset; // نصف هر ضلع مربع
  const a = 5.3;
  let points = [a, -a, -a, -a, -a, a, a, a, a, -a];

  // جابجایی مختصات نقاط
  points = shiftPoints(points, x, y);

  const polyline = document.createElementNS(svgNS, "polyline");
  //خط زیر باعث اون مربع مسخره پر رنگ دور سمبل میشه موقع کلیک. چون قابل فوکوسش میکنه
  //polyline.setAttribute("tabindex", "1");
  polyline.setAttribute("class", "symbol_square");
  polyline.setAttribute("id", id);
  // polyline.setAttribute("stroke-opacity", "0.9");
  polyline.setAttribute("stroke-width", "1px");
  polyline.setAttribute("stroke-linecap", "round");
  polyline.setAttribute("stroke-miterlimit", "0");
  polyline.setAttribute("fill", "transparent");
  polyline.setAttribute("stroke", color);
  polyline.setAttribute("points", points);
  svg.appendChild(polyline);
}

// جابجایی مختصات نقاط
function shiftPoints(points, x, y) {
  let l = points.length;
  l--;
  for (let i = 0; i < l; i += 2) {
    points[i] += x;
    points[i + 1] += y;
  }
  return points;
}
