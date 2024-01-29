import { svgNS } from "../initials.js";
import dims from "../dims.js";
// import { patientDataObj } from "../dataObj-sample.js";

export default function putReport(SVGForm, patientDataObj) {
  // متغیرهای موقت به جای پارامتر نداشته
  // context = `آدرس: مشهد، خیابان احمدآباد، خیابان عارف، عارف ۲، ساختمان سینا، طبقه اول، تلفن: ۰۵۱۳۸۴۴۲۵۹۲`;

  const w = dims.report.width,
    h = dims.report.height;

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("x", dims.edge.left);
  // svg.setAttribute("y", dims.A4.height - dims.edge.bottom - dims.footer.height - dims.report.height);
  svg.setAttribute(
    "y",
    dims.edge.top +
      dims.header.height +
      dims.patientInfo.height +
      dims.audiograms.height +
      dims.speech.height +
      dims.tympanometry.height +
      dims.acoustics.height
  );
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
  text.setAttribute("class", "header5");
  text.setAttribute("x", w - 1);
  text.setAttribute("y", 5);
  text.innerHTML = "گزارش: " + patientDataObj.report;
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

  SVGForm.appendChild(svg);
}
