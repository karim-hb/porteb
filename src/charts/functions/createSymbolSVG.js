// وارد کردن داده‌های سراسری
import { svgNS } from "../initials.js";

// ساخت اس‌وی‌جی شانزده سمبل
export default function createSymbolSVG(symbol) {
  let r = 12 / 5;

  let dot = [],
    points = [],
    dx,
    xNR,
    yNR,
    polyline,
    circle;

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "-6 -6 12 12");

  // یک بوردر برای اس‌ وی جی به تمام پهنا و ارتفاع رسم می‌کنیم
  const rect = document.createElementNS(svgNS, "rect");
  rect.setAttribute("x", -6);
  rect.setAttribute("y", -6);
  rect.setAttribute("width", 12);
  rect.setAttribute("height", 12);
  rect.setAttribute("fill", "transparent");
  // rect.setAttribute("stroke", "black");
  svg.appendChild(rect);

  switch (symbol) {
    case "R_AC":
    case "R_AC_NR":
      dot = [0, 0];
      //مختصات نقطه اول سمبل عدم پاسخ
      xNR = r * Math.sin(Math.PI / 4);
      yNR = xNR;
      xNR *= -1;

      circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("stroke", "red");
      circle.setAttribute("stroke-width", "0.6px");
      circle.setAttribute("fill", "transparent");
      circle.setAttribute("cx", 0);
      circle.setAttribute("cy", 0);
      circle.setAttribute("r", r);

      svg.appendChild(circle);
      break;

    case "R_AC_M":
    case "R_AC_M_NR":
      // dx = (3 / 2) * r * Math.tan(Math.PI / 6);
      // dy = r / 2;

      // // ذخیره مختصات مبدا علامت بدون پاسخ
      // xNR = -dx + x;
      // yNR = dy + y;
      dx = 2 * r * Math.tan(Math.PI / 6);

      points = [0, -r, dx, r, -dx, r, 0, -r];

      polyline = document.createElementNS(svgNS, "polyline");
      polyline.setAttribute("stroke-width", "0.6px");
      polyline.setAttribute("stroke-linecap", "round");
      polyline.setAttribute("stroke-miterlimit", "0");
      polyline.setAttribute("fill", "transparent");
      polyline.setAttribute("stroke", "red");
      polyline.setAttribute("points", points);
      svg.appendChild(polyline);

      //مختصات نقطه اول سمبل عدم پاسخ
      xNR = -dx;
      yNR = r;
      break;

    case "R_BC":
    case "R_BC_NR":
      // مقدار جابجایی سمبل از مرکز
      dx = -r / 1.5;

      //مختصات نقطه اول سمبل عدم پاسخ
      xNR = dx;
      yNR = r;

      dot = [0, -r, -r, 0, 0, r];
      points = [dot[0] + dx, dot[1], dot[2] + dx, dot[3], dot[4] + dx, dot[5]];
      polyline = document.createElementNS(svgNS, "polyline");
      polyline.setAttribute("stroke-width", "0.6px");
      polyline.setAttribute("fill", "transparent");
      polyline.setAttribute("stroke", "red");
      polyline.setAttribute("points", points);
      svg.appendChild(polyline);
      break;

    case "R_BC_M":
    case "R_BC_M_NR":
      // مقدار جابجایی سمبل از مرکز
      dx = -r / 1.5;

      dot = [0, -r, -r, -r, -r, r, 0, r];

      points = `${dot[0] + dx}, ${dot[1]}, 
                ${dot[2] + dx}, ${dot[3]}, 
                ${dot[4] + dx}, ${dot[5]}, 
                ${dot[6] + dx}, ${dot[7]} 
                `;
      polyline = document.createElementNS(svgNS, "polyline");
      polyline.setAttribute("stroke-width", "0.6px");
      polyline.setAttribute("fill", "transparent");
      polyline.setAttribute("stroke", "red");
      polyline.setAttribute("points", points);
      svg.appendChild(polyline);
      //مختصات نقطه اول سمبل عدم پاسخ
      xNR = -r + dx;
      yNR = r;
      break;

    case "L_AC":
    case "L_AC_NR":
      //مختصات نقطه اول سمبل عدم پاسخ
      xNR = r;
      yNR = r;

      // const x1 = (Math.sqrt(2) / 2) * r;
      // const y1 = -x1;
      // dot = [x1, y1, -x1, -y1, -x1, y1, x1, -y1];

      points = [-r, -r, r, r];

      polyline = document.createElementNS(svgNS, "polyline");
      polyline.setAttribute("stroke-width", "0.6px");
      polyline.setAttribute("fill", "transparent");
      polyline.setAttribute("stroke", "blue");
      polyline.setAttribute("points", points);
      svg.appendChild(polyline);

      points = [r, -r, -r, r];
      polyline = document.createElementNS(svgNS, "polyline");
      polyline.setAttribute("stroke-width", "0.6px");
      polyline.setAttribute("fill", "transparent");
      polyline.setAttribute("stroke", "blue");
      polyline.setAttribute("points", points);
      svg.appendChild(polyline);
      break;

    case "L_AC_M":
    case "L_AC_M_NR":
      dot = [0, 0];
      //مختصات نقطه اول سمبل عدم پاسخ
      xNR = r;
      yNR = r;

      // مختصات چهار نقطه مربع سمبل
      dot = [-r, -r, r, -r, r, r, -r, r, -r, -r];
      polyline = document.createElementNS(svgNS, "polyline");
      polyline.setAttribute("stroke-width", "0.6px");
      polyline.setAttribute("fill", "transparent");
      polyline.setAttribute("stroke-linecap", "round");
      polyline.setAttribute("stroke", "blue");
      polyline.setAttribute("points", dot);
      svg.appendChild(polyline);
      break;

    case "L_BC":
    case "L_BC_NR":
      // مقدار جابجایی سمبل از مرکز
      dx = r / 1.5;

      //مختصات نقطه اول سمبل عدم پاسخ
      xNR = dx;
      yNR = r;

      dot = [0, -r, r, 0, 0, r];
      points = [dot[0] + dx, dot[1], dot[2] + dx, dot[3], dot[4] + dx, dot[5]];
      polyline = document.createElementNS(svgNS, "polyline");
      polyline.setAttribute("stroke-width", "0.6px");
      polyline.setAttribute("fill", "transparent");
      polyline.setAttribute("stroke", "blue");
      polyline.setAttribute("points", points);
      svg.appendChild(polyline);
      break;

    case "L_BC_M":
    case "L_BC_M_NR":
      // مقدار جابجایی سمبل از مرکز
      dx = r / 1.5;

      //مختصات نقطه اول سمبل عدم پاسخ
      xNR = r + dx;
      yNR = r;

      dot = [0, -r, r, -r, r, r, 0, r];
      points = `${dot[0] + dx}, ${dot[1]},
                ${dot[2] + dx}, ${dot[3]},
                ${dot[4] + dx}, ${dot[5]},
                ${dot[6] + dx}, ${dot[7]}
              `;
      polyline = document.createElementNS(svgNS, "polyline");
      polyline.setAttribute("stroke-width", "0.6px");
      polyline.setAttribute("fill", "transparent");
      polyline.setAttribute("stroke", "blue");
      polyline.setAttribute("points", points);
      svg.appendChild(polyline);
      break;
    default:
      break;
  }

  //رسم قسمت NR
  if (getLastLetters(symbol) == "NR") {
    svg.appendChild(createNRSVG(symbol[0], xNR, yNR));
    // تابع ایجاد تصویر عدم پاسخ
    function createNRSVG(side, x, y) {
      let symColor = side === "R" ? "red" : "blue";
      let angle = side === "R" ? "135" : "45";
      const a = r / 2;
      const x1 = a * Math.cos(Math.PI / 6);
      const y1 = a * Math.sin(Math.PI / 6);
      // مختصات سه نقطه فلش
      //A, B, C
      let points = [-x1 + r + x, -y1 + y, r + x, y, -x1 + x + r, y1 + y];
      const g = document.createElementNS(svgNS, "g");
      let polyline = document.createElementNS(svgNS, "polyline");
      polyline.setAttribute("stroke-width", "0.4px");
      polyline.setAttribute("fill", "transparent");
      polyline.setAttribute("stroke", symColor);
      polyline.setAttribute("points", points);
      g.appendChild(polyline);
      // مختصات خط فلش
      points = [x, y, x + r, y];
      polyline = document.createElementNS(svgNS, "polyline");
      polyline.setAttribute("stroke-width", "0.4px");
      polyline.setAttribute("fill", "transparent");
      polyline.setAttribute("stroke", symColor);
      polyline.setAttribute("points", points);
      g.setAttribute("transform", `rotate(${angle} ${x} ${y})`);
      g.appendChild(polyline);
      return g;
    }
  }

  return svg;
}

// تابع برگردادندن دو حرف آخر
function getLastLetters(symbol) {
  const l = symbol.length;
  return symbol[l - 2] + symbol[l - 1];
}
