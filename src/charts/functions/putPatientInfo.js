// import caption from "../modules/caption.js";
import { svgNS } from "../initials.js";
import dims from "../dims.js";
// import { patientDataObj } from "../dataObj-sample.js";

export default function putPatientInfo(SVGForm, patientDataObj) {
  let label = "مراجعه‌کننده: ";

  const svg = document.createElementNS(svgNS, "svg");

  const w = dims.patientInfo.width,
    h = dims.patientInfo.height;

  svg.setAttribute("x", dims.edge.left);
  svg.setAttribute("y", dims.edge.top + dims.header.height);
  svg.setAttribute("width", w);
  svg.setAttribute("height", h);

  // کادر بوردر راهنما
  let rect = document.createElementNS(svgNS, "rect");
  rect.setAttribute("x", 0);
  rect.setAttribute("y", 0);
  rect.setAttribute("width", w);
  rect.setAttribute("height", h);
  rect.setAttribute("fill", "transparent");
  rect.setAttribute("stroke", "red");
  rect.setAttribute("stroke-width", "0.1mm");
  rect.setAttribute("class", "gridLines");

  svg.appendChild(rect);

  // نام بیمار
  let text = document.createElementNS(svgNS, "text");
  text.setAttribute("class", "header5");
  text.setAttribute("x", w);
  text.setAttribute("y", 5);
  text.innerHTML = label + patientDataObj.name + " " + patientDataObj.lastName;
  svg.appendChild(text);

  // سن بیمار
  label = "سن: ";
  text = document.createElementNS(svgNS, "text");
  text.setAttribute("class", "header5");
  text.setAttribute("x", w / 2);
  text.setAttribute("y", 5);
  text.innerHTML = label + patientDataObj.age;
  svg.appendChild(text);

  // ارجاع
  label = "ارجاع از: ";
  text = document.createElementNS(svgNS, "text");
  text.setAttribute("class", "header5");
  text.setAttribute("x", w / 3);
  text.setAttribute("y", 5);
  text.innerHTML = label + patientDataObj.referrer;
  svg.appendChild(text);

  // شرح حال
  label = "شرح حال: ";
  text = document.createElementNS(svgNS, "text");
  text.setAttribute("class", "header5");
  text.setAttribute("x", w);
  text.setAttribute("y", 15);
  text.innerHTML = patientDataObj.history;
  svg.appendChild(text);

  // خط زیر
  let line = document.createElementNS(svgNS, "line");
  line.setAttribute("x1", 0);
  line.setAttribute("y1", h);
  line.setAttribute("x2", w);
  line.setAttribute("y2", h);
  line.setAttribute("stroke", "black");
  line.setAttribute("stroke-width", 0.5);

  svg.appendChild(line);

  // caption(
  //   svg,
  //   0,
  //   0,
  //   90,
  //   8,
  //   label + name,
  //   "header4"
  // );
  // caption(
  //   svg,
  //   5,
  //   30,
  //   55,
  //   8,
  //   "ارجاع از: دکتر ناصر دلدار بجنوردی",
  //   "header4"
  // );

  SVGForm.appendChild(svg);
}
