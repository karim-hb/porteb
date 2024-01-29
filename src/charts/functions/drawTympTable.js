// import { tympDataObj } from "../../dataObj-sample.js";
import { tympTableObj } from "../initials.js";
export default function drawTympTable(container, side, x, y, w, tympDataObj) {
  drawTympGrid(container, side, x, y, w, tympDataObj);
}

// تابع ایجاد قسمت شطرنجی برای رسم منحنی
function drawTympGrid(container, side, x, y, w, tympDataObj) {
  const h = (w * 60) / 110,
    svgNS = "http://www.w3.org/2000/svg",
    svg = document.createElementNS(svgNS, "svg");
  // svg.setAttribute("id", id);
  svg.setAttribute("width", w);
  svg.setAttribute("height", h);
  svg.setAttribute("x", x);
  svg.setAttribute("y", y);
  svg.setAttribute("viewBox", tympTableObj.viewBox);

  // یک بوردر راهنمای توسعه برای اس‌ وی جی به تمام پهنا و ارتفاع رسم می‌کنیم
  const rect = document.createElementNS(svgNS, "rect");
  rect.setAttribute("x", 0);
  rect.setAttribute("y", 0);
  rect.setAttribute("width", tympTableObj.width);
  rect.setAttribute("height", tympTableObj.height);
  rect.setAttribute("fill", "transparent");
  rect.setAttribute("stroke-width", "0.5");
  rect.setAttribute("stroke", "green");
  rect.setAttribute("class", "gridLines");
  svg.appendChild(rect);

  // رسم خطوط افقی از بالا به پایین
  // آرایه مختصات خطوط افقی

  let g = document.createElementNS(svgNS, "g");
  g.setAttribute("stroke", "black");
  g.setAttribute("stroke-width", "0.1px");

  tympTableObj.hLinesCord.forEach((elem) => {
    let line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", elem[0]);
    line.setAttribute("y1", elem[1]);
    line.setAttribute("x2", elem[2]);
    line.setAttribute("y2", elem[3]);
    g.appendChild(line);
  });
  svg.appendChild(g);
  // رسم خطوط عمودی از چپ به راست
  // آرایه مختصات خطوط عمودی

  g = document.createElementNS(svgNS, "g");
  g.setAttribute("stroke", "black");
  g.setAttribute("stroke-width", "0.1");
  tympTableObj.vLinesCord.forEach((elem) => {
    let line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", elem[0]);
    line.setAttribute("y1", elem[1]);
    line.setAttribute("x2", elem[2]);
    line.setAttribute("y2", elem[3]);
    g.appendChild(line);
  });
  svg.appendChild(g);

  // اعداد افقی مربوط به فشار از چپ به راست
  // آرایه مختصات و عدد مربوطه
  tympTableObj.hAxis.forEach((elem) => {
    let text = document.createElementNS(svgNS, "text");
    text.style = `font: 18% Verdana, Helvetica, Arial, sans-serif;
                  user-select: none;`;
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("x", elem[0]);
    text.setAttribute("y", elem[1]);
    text.innerHTML = elem[2];
    svg.appendChild(text);
  });

  // اعداد عمودی مربوط به کامپلیانس از پایین به بالا
  tympTableObj.vAxis.forEach((elem) => {
    let text = document.createElementNS(svgNS, "text");
    text.style = `font: 2.5px Verdana, Helvetica, Arial, sans-serif;
 user-select: none;`;
    text.setAttribute("text-anchor", "end");
    text.setAttribute("x", elem[0]);
    text.setAttribute("y", elem[1]);
    text.innerHTML = elem[2];
    svg.appendChild(text);
  });

  // برچسب های ویژگی‌های تمپانومتری
  let label = [
    [25, 10, "Type: ", tympDataObj[side].Type],
    [25, 16, "ECV: ", tympDataObj[side].ECV],
    [25, 22, "SC: ", tympDataObj[side].SC],
    [25, 28, "MEP: ", tympDataObj[side].MEP],
  ];
  // تعیین رنگ قرمز یا آبی
  let color = side == "R" ? "red" : "blue";
  label.forEach((elem) => {
    let text = document.createElementNS(svgNS, "text");
    let tspan = document.createElementNS(svgNS, "tspan");
    text.style = `font: 4px Verdana, Helvetica, Arial, sans-serif;
 user-select: none;`;

    text.setAttribute("text-anchor", "end");
    text.setAttribute("x", elem[0]);
    text.setAttribute("y", elem[1]);
    text.innerHTML = elem[2];

    // نمایش با استایل متفاوت مقدار
    tspan.setAttribute("style", `font-weight: bold; fill: ${color};`);
    tspan.innerHTML = elem[3];
    text.appendChild(tspan);
    svg.appendChild(text);
  });

  //رسم نمودار تمپانومتری
  drawTympCurve();

  container.appendChild(svg);

  //رسم نمودار تمپانومتری
  function drawTympCurve() {
    //رسم نمودار تمپانومتری
    // مختصات نقطه کنترل
    let ck1 = [70, 50],
      p1 = [85, 52],
      p2 = [65, 35],
      ck2 = [60, 50],
      p3 = [25, 52];
    // رسم دایره نشانگر کنترل منحنی راست
    let circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", ck1[0]);
    circle.setAttribute("cy", ck1[1]);
    circle.setAttribute("r", 0.5);
    circle.setAttribute("stroke", "red");
    svg.appendChild(circle);

    // رسم دایره نشانگر کنترل منحنی چپ
    circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", ck2[0]);
    circle.setAttribute("cy", ck2[1]);
    circle.setAttribute("r", 0.5);
    circle.setAttribute("stroke", "red");
    svg.appendChild(circle);

    let path = document.createElementNS(svgNS, "path");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "red");
    path.setAttribute("stroke-width", "0.5px");
    path.setAttribute(
      "d",
      `M ${p1[0]} ${p1[1]}
    Q ${ck1[0]} ${ck1[1]} , ${p2[0]} ${p2[1]}
    Q ${ck2[0]} ${ck2[1]} , ${p3[0]} ${p3[1]}`
    );
    svg.appendChild(path);
    // div = document.getElementById("svg");
  }
}

// تابع ایجاد جدول مقادیر تمپانومتری
function drawTympDataTable(container, x, y, w, id) {
 let dw = (w * 5) / 22; // پهنای جدول مقادیر
}
