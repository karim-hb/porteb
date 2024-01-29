import { svgNS } from "../initials.js";
import dims from "../dims.js";
import drawReflexTable from "./drawReflexTable.js";

export default function putReflex(container) {
  const w = dims.acoustics.width,
    h = dims.acoustics.height,
    left =
      dims.edge.left +
      (dims.A4.width - dims.edge.left - dims.edge.right - w) / 2;

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("x", left);
  svg.setAttribute(
    "y",
    dims.edge.top +
      dims.header.height +
      dims.patientInfo.height +
      dims.audiograms.height +
      dims.speech.height +
      dims.tympanometry.height
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
  rect.setAttribute("stroke", "green");
  rect.setAttribute("stroke-width", "0.2mm");
  rect.setAttribute("class", "gridLines");
  svg.appendChild(rect);

  // عنوان
  let text = document.createElementNS(svgNS, "text");
  text.setAttribute("class", "header2");
  text.setAttribute("x", w / 2);
  text.setAttribute("y", 5);
  text.innerHTML = "ACOUSTIC REFLEXES";
  svg.appendChild(text);

  // تابع رسم جدول رفلکس
  drawReflexTable(svg, "R", 0, 8, w / 2 - 5, 22);
  drawReflexTable(svg, "L", w / 2 + 5, 8, w / 2 - 5, 22);

  container.appendChild(svg);
}
