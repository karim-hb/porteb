// بخش سرصفحه
import { svgNS } from "../initials.js";
import dims from "../dims.js";
// import caption from "../modules/caption.js";
// import dataObj from "../../dataObj-sample.js";

export default function putHeader(SVGForm, dataObj) {
  // console.log(dataObj.names[0]);
  const headTitle = dataObj.names[0];

  const w = dims.header.width,
    h = dims.header.height;

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("x", dims.edge.left);
  svg.setAttribute("y", dims.edge.top);

  svg.setAttribute("width", w);
  svg.setAttribute("height", h);

  // کادر بوردر راهنما
  let rect = document.createElementNS(svgNS, "rect");
  rect.setAttribute("x", 0);
  rect.setAttribute("y", 0);
  rect.setAttribute("width", w);
  rect.setAttribute("height", h);
  rect.setAttribute("fill", "transparent");
  rect.setAttribute("stroke", "blue");
  rect.setAttribute("stroke-width", "0.1mm");
  rect.setAttribute("class", "gridLines");

  svg.appendChild(rect);

  let text = document.createElementNS(svgNS, "text");
  text.style = `user-select: none;
                direction: rtl;
                text-align: right;
                font-family: vazirmatn;
                font-size: 1.2mm;
                font-weight: bold;`;

  // text.setAttribute("text-anchor", "middle");
  text.setAttribute("x", w - 20);
  text.setAttribute("y", h - 10);
  text.innerHTML = headTitle;
  svg.appendChild(text);

  let image = document.createElementNS(svgNS, "image");
  image.setAttribute(
    "src",
    "logo-1.png"
  );
  // console.log(image);
  image.setAttribute("width", "18");
  image.setAttribute("height", "18");
  image.setAttribute("x", w - 18);
  image.setAttribute("y", 0);
  // <image href="firefox.jpg" x="0" y="0" height="50px" width="50px"/>
  svg.appendChild(image);

  text = document.createElementNS(svgNS, "text");
  text.setAttribute("class", "header4");
  text.setAttribute("x", 30);
  text.setAttribute("y", 5);
  text.innerHTML = "تاریخ: ۱۴۰۲/۱۲/۲۸";
  svg.appendChild(text);

  text = document.createElementNS(svgNS, "text");
  text.setAttribute("class", "header4");
  text.setAttribute("x", 30);
  text.setAttribute("y", 15);
  text.innerHTML = "شماره: ۲۸";
  svg.appendChild(text);
  // caption(svg, 0, 5, 32, 8, "شماره: ۲۸", "header4");

  // خط زیر
  let line = document.createElementNS(svgNS, "line");
  line.setAttribute("x1", 0);
  line.setAttribute("y1", h);
  line.setAttribute("x2", w);
  line.setAttribute("y2", h);
  line.setAttribute("stroke", "black");
  line.setAttribute("stroke-width", 0.5);
  svg.appendChild(line);

  SVGForm.appendChild(svg);
}
