import {
  h,
  r,
  svgNS,
  selectedSymbolObj,
  xFrequency,
  yIntensity,
  symbolType,
  currentAuthLocal,
  userXOrigin,
  userYOrigin,
  viewBoxWidth,
  viewBoxHeight,
  ratio,
  dI,
  dotX,
  dotY,
} from "../initials.js";

// تابع رسم جدول ادیوگرام در
export default function drawAudTable(container, x, y, w, id) {
  const h = w;

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");

  svg.setAttribute("width", w);
  svg.setAttribute("height", h);
  // مقادیر ویباکس در فایل اینیژال تعریف شده است. اگر اینجا تغییر دادی حواست به اونجا باشه
  svg.setAttribute("viewBox", "-15 -15 170 170");
  svg.setAttribute(
    "viewBox",
    `${userXOrigin} ${userYOrigin} ${viewBoxWidth} ${viewBoxHeight}`
  );
  svg.setAttribute("x", x);
  svg.setAttribute("y", y);
  svg.setAttribute("id", id);
  // خط زیر عامل اون مربع سیاه دور جدول در صفحه فرم
  svg.setAttribute("tabindex", 1);

  // // مربع مرزی کل ادیوگرام
  // const rect = document.createElementNS(svgNS, "rect");
  // rect.setAttribute("x", userXOrigin);
  // rect.setAttribute("y", userYOrigin);
  // rect.setAttribute("width", viewBoxWidth);
  // rect.setAttribute("height", viewBoxHeight);
  // rect.setAttribute("stroke", "red");
  // rect.setAttribute("fill", "transparent");
  // // از خط زیر برای محو کردن کادرها در تابغ مخفی کردن خطوط راهنما استفاده میکنیم
  // rect.setAttribute("class", "gridLines");

  // svg.appendChild(rect);

  // به نظر یک آرایه از مختصات خطوط قابل رسم یا یک آبجکت تعریف کنیم کار راحت تر از محاسبه مختصات با ریاضیات است

  const l = [
    //vertical lines 8 numbers
    [0, 0, 0, 150],
    [20, 0, 20, 150],
    [40, 0, 40, 150],
    //[60, 0, 60, 150], bold line
    [80, 0, 80, 150],
    [100, 0, 100, 150],
    [120, 0, 120, 150],
    [140, 0, 140, 150],
    //horizontal lines 16 numbers
    [0, 0, 140, 0],
    [0, 10, 140, 10],
    //[0, 20, 140, 20], bold line
    [0, 30, 140, 30],
    [0, 40, 140, 40],
    [0, 50, 140, 50],
    [0, 60, 140, 60],
    [0, 70, 140, 70],
    [0, 80, 140, 80],
    [0, 90, 140, 90],
    [0, 100, 140, 100],
    [0, 110, 140, 110],
    [0, 120, 140, 120],
    [0, 130, 140, 130],
    [0, 140, 140, 140],
    [0, 150, 140, 150],
  ];

  const g = document.createElementNS(svgNS, "g");
  g.setAttribute(
    "style",
    `stroke-width: 0.5px;
    stroke: black;
    stroke-opacity: 1;`
  );

  for (let i = 0; i < l.length; i++) {
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", `${l[i][0]}`);
    line.setAttribute("y1", `${l[i][1]}`);
    line.setAttribute("x2", `${l[i][2]}`);
    line.setAttribute("y2", `${l[i][3]}`);

    g.appendChild(line);
  }

  svg.appendChild(g);

  // پررنگ کردن خط عمودی فرکانسی 1000 و خط افقی شدتی 0
  const bl = [
    [60, 0, 60, 150],
    [0, 20, 140, 20],
  ];

  for (let i = 0; i < bl.length; i++) {
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", `${bl[i][0]}`);
    line.setAttribute("y1", `${bl[i][1]}`);
    line.setAttribute("x2", `${bl[i][2]}`);
    line.setAttribute("y2", `${bl[i][3]}`);
    line.setAttribute(
      "style",
      `stroke-width: 1px;
			stroke: black;
			stroke-opacity: 1;`
    );
    svg.appendChild(line);
  }

  // درج 4 خط فرکانسی فرعی عمودی نقطه‌چین
  // [x1, y1, x2, y2]
  const dl = [
    [53, 0, 53, 150],
    [73, 0, 73, 150],
    [93, 0, 93, 150],
    [113, 0, 113, 150],
  ];

  for (let i = 0; i < dl.length; i++) {
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", `${dl[i][0]}`);
    line.setAttribute("y1", `${dl[i][1]}`);
    line.setAttribute("x2", `${dl[i][2]}`);
    line.setAttribute("y2", `${dl[i][3]}`);
    line.setAttribute(
      "style",
      `stroke: black;
			stroke-width: 0.4px;
			stroke-opacity: 0.5;
      stroke-dasharray: 1;
      `
    );
    //line.setAttribute("stroke-dasharray", "1");
    svg.appendChild(line);
  }

  // درج اعداد فرکانس اصلی 6 عدد
  // [x, y, F]
  const tf = [
    [20, -2, 250],
    [40, -2, 500],
    [60, -2, 1000],
    [80, -2, 2000],
    [100, -2, 4000],
    [120, -2, 8000],
  ];

  for (let i = 0; i < tf.length; i++) {
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute(
      "style",
      "font: 5px Verdana, Helvetica, Arial, sans-serif; user-select: none;"
    );
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("x", `${tf[i][0]}`);
    text.setAttribute("y", `${tf[i][1]}`);
    text.innerHTML = tf[i][2];
    svg.appendChild(text);
  }
  // درج اعداد شدتی اصلی 13 عدد
  //[x, y, I]
  const ti = [
    [-2, 12, -10],
    [-2, 22, 0],
    [-2, 32, 10],
    [-2, 42, 20],
    [-2, 52, 30],
    [-2, 62, 40],
    [-2, 72, 50],
    [-2, 82, 60],
    [-2, 92, 70],
    [-2, 102, 80],
    [-2, 112, 90],
    [-2, 122, 100],
    [-2, 132, 110],
    [-2, 142, 120],
  ];

  for (let i = 0; i < ti.length; i++) {
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute(
      "style",
      "font: 5px Verdana, Helvetica, Arial, sans-serif; user-select: none;"
    );
    text.setAttribute("text-anchor", "end");
    text.setAttribute("x", `${ti[i][0]}`);
    text.setAttribute("y", `${ti[i][1]}`);
    text.innerHTML = ti[i][2];
    svg.appendChild(text);
  }
  container.appendChild(svg);

  return "oh";
}
