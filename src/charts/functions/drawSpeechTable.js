import { svgNS } from "../initials.js";
// import caption from "./caption.js";

export default function drawSpeechTable(
  container,
  side,
  x,
  y,
  w,
  h,
  speechDataObj
) {
  h = 12;
  // side = "L";
  speechDataObj = {
    R: { SAT: "5", SRT: "10", MCL: "35", UCL: "95", SDS: "100" },
    L: { SAT: "5", SRT: "10", MCL: "40", UCL: "95", SDS: "96" },
  };
  let sideCaption = side == "R" ? "Right" : "Left";

  // یک جدول 6*2  - ۲ سطر و ۶ ستون
  // const h = w / 6;
  const cw = w / 6; // پهنای هر خانه
  const ch = h / 2; // ارتفاع هر خانه

  // یک آرایه دو بعدی از سطرها و ستون ها می‌سازیم
  const arr = [
    ["", "SAT", "SRT", "MCL", "UCL", "SDS"],
    [
      sideCaption,
      speechDataObj[side].SAT,
      speechDataObj[side].SRT,
      speechDataObj[side].MCL,
      speechDataObj[side].UCL,
      speechDataObj[side].SDS,
    ],
  ];

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("x", x);
  svg.setAttribute("y", y);
  svg.setAttribute("width", w);
  svg.setAttribute("height", h);

  // مربع احاطه‌کننده کل جدول برای راهنمای توسعه
  let rect = document.createElementNS(svgNS, "rect");
  rect.setAttribute("x", 0);
  rect.setAttribute("y", 0);
  rect.setAttribute("width", w);
  rect.setAttribute("height", h);
  rect.setAttribute(
    "style",
    "fill: transparent; stroke: green; stroke-width: 0.5;"
  );
  rect.setAttribute("class", "gridLines");
  svg.appendChild(rect);
  
  let cx, cy; //مختصات چپ و بالای هر خانه

  // چاپ مقادیر آرایه در سطر و ستون های جدول
  arr.forEach((row, i) => {
    row.forEach((cell, j) => {
      cx = cw * j;
      cy = ch * i;
      insertCell(side, cell, i, j, cx, cy);
    });
  });

  // insertCell("Right", cw / 2  + cw * 0, ch / 2 + ch * 1 )
  function insertCell(side, cell, i, j, x, y) {
    console.log(x, y, cell);
    // ابعاد مستطیل داخل هر خانه
    // یک میلیمتر از هر طرف - میشه بعدا داینامیک کرد
    let d = 1;

    let rw = cw - d;
    let rh = ch - d;

    // شرطی ایجاد کنیم گه برای مقادیر فقط کادر درست کنه
    if (i == 1 && j >= 1) {
      let rect = document.createElementNS(svgNS, "rect");

      rect.setAttribute("x", x + d / 2);
      rect.setAttribute("y", y + d / 2);
      rect.setAttribute("width", rw);
      rect.setAttribute("height", rh);
      rect.setAttribute(
        "style",
        "fill: transparent; stroke: black; stroke-width: 0.2;"
      );
      // rect.setAttribute("class", "gridLines");
      svg.appendChild(rect);
    }

    // قرار دادن مقادیر آرایه
    // شرطی که مقادیر را رنگی نمایش دهد
    let color = "black";
    if (i == 1 && j >= 1) {
      color = side == "R" ? "red" : "blue";
    }
    let text = document.createElementNS(svgNS, "text");
    text.setAttribute("class", "header3");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", color);
    text.setAttribute("x", x + cw / 2);
    text.setAttribute("y", y + ch / 1.5 + d / 2);
    text.innerHTML = cell;
    svg.appendChild(text);
  }

  container.appendChild(svg);
}
