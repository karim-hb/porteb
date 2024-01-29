import { svgNS } from "../initials.js";

export default function drawReflexTable(container, side, x, y, w, h) {
  // جدولی با ۳ سطر و ۵ ستون
  // پهنا و ارتفاع هر خانه
  // ستون اول عریض تر از سایر ستون ها
  const cw = [
    (w * 26) / 100,
    (w * 18.5) / 100,
    (w * 18.5) / 100,
    (w * 18.5) / 100,
    (w * 18.5) / 100,
  ];
  const ch = h / 3;

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
    "fill: transparent; stroke: red; stroke-width: 0.5;"
  );
  rect.setAttribute("class", "gridLines");
  svg.appendChild(rect);

  container.appendChild(svg);

  const captionArr = [
    ["Frequency", "500", "1000", "2000", "4000"],
    ["IPSI", "", "", "", ""],
    ["CONTRA", "", "", "", ""],
  ];

  let cx = 0,
    cy = 0; //مختصات چپ و بالای هر خانه

  // چاپ مقادیر آرایه در سطر و ستون های جدول
  captionArr.forEach((row, i) => {
    row.forEach((cell, j) => {
      cy = ch * i;
      insertCell(side, cell, i, j, cx, cy);
      cx = cw[j] + cx;
    });
    cx = 0;
  });

  function insertCell(side, cell, i, j, x, y) {
    console.log(x, y, cell);
    // ابعاد مستطیل داخل هر خانه
    // یک میلیمتر از هر طرف - میشه بعدا داینامیک کرد
    let d = 1;

    let rw = cw[j] - d;
    let rh = ch - d;

    // شرطی ایجاد کنیم گه برای مقادیر فقط کادر درست کنه
    if (i >= 1 && j >= 1) {
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

    // شرط برای ستون اول مقادیر راست چین شود
    let anchor = j == 0 ? "end" : "middle";
    let dx = j == 0 ? cw[j] : cw[j] / 2;

    let text = document.createElementNS(svgNS, "text");
    text.setAttribute("class", "header3");
    text.setAttribute("text-anchor", anchor);
    text.setAttribute("fill", "black");
    text.setAttribute("x", x + dx - d / 2);
    text.setAttribute("y", y + ch / 1.5 + d / 2);
    text.innerHTML = cell;
    svg.appendChild(text);
  }

  // تابع پرکردن مقادیر رفلکس در جدول
  fillReflex(svg, side);

  container.appendChild(svg);

  // پرکردن مقادیر رفلکس
  function fillReflex(container, side, reflexDataObj) {
    // مقادیر پایین نمونه هست. پاک میشود
    reflexDataObj = {
      R: {
        IPSI: { 500: 85, 1000: 90, 2000: "NR", 4000: "NR" },
        CONTRA: { 500: 85, 1000: 90, 2000: "NR" },
      },
      L: {
        IPSI: { 500: 85, 1000: 90, 2000: "95", 4000: "NR" },
        CONTRA: { 500: 80 },
      },
    };

    const valueArray = [
      [],
      [
        "",
        reflexDataObj[side].IPSI["500"],
        reflexDataObj[side].IPSI["1000"],
        reflexDataObj[side].IPSI["2000"],
        reflexDataObj[side].IPSI["4000"],
      ],
      [
        "",
        reflexDataObj[side].CONTRA["500"],
        reflexDataObj[side].CONTRA["1000"],
        reflexDataObj[side].CONTRA["2000"],
        reflexDataObj[side].CONTRA["4000"],
      ],
    ];

    let cx = 0,
      cy = 0; //مختصات چپ و بالای هر خانه

    // چاپ مقادیر آرایه در سطر و ستون های جدول
    valueArray.forEach((row, i) => {
      row.forEach((cell, j) => {
        cy = ch * i;
        if (cell != undefined) {
          insertCell(side, cell, i, j, cx, cy);
        }
        cx = cw[j] + cx;
      });
      cx = 0;
    });

    function insertCell(side, cell, i, j, x, y) {
      // ابعاد مستطیل داخل هر خانه
      // یک میلیمتر از هر طرف - میشه بعدا داینامیک کرد
      let d = 1;

      let rw = cw[j] - d;
      let rh = ch - d;

      // قرار دادن مقادیر آرایه
      // شرطی که مقادیر را رنگی نمایش دهد
      let color = "black";
      if (i >= 1 && j >= 1) {
        color = side == "R" ? "red" : "blue";
      }
      let text = document.createElementNS(svgNS, "text");
      text.setAttribute("class", "header3");
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", color);
      text.setAttribute("x", x + cw[j] / 2);
      text.setAttribute("y", y + ch / 1.6 + d / 2);
      text.innerHTML = cell;
      svg.appendChild(text);
    }

    // container.appendChild(svg);
  }
}
