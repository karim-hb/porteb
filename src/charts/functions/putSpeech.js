// قسمت جدول‌های آزمون گفتاری و عنوان آن
import { svgNS } from "../initials.js";
import dims from "../dims.js";
import drawSpeechTable from "./drawSpeechTable.js";

export default function putSpeech(SVGForm) {
  const w = dims.speech.width,
    h = dims.speech.height,
    top = 
      dims.edge.top +
      dims.header.height +
      dims.patientInfo.height +
      dims.audiograms.height,
    left =
      dims.edge.left +
      (dims.A4.width - dims.edge.left - dims.edge.right - w) / 2;

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("x", left);
  svg.setAttribute("y", top);

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

  // عنوان
  let text = document.createElementNS(svgNS, "text");
  text.setAttribute("class", "header2");
  text.setAttribute("x", w / 2);
  text.setAttribute("y", 5);
  text.innerHTML = "SPEECH TESTS";
  svg.appendChild(text);
  // caption(svg, 5, 5, 190, 10, "SPEECH TESTS", "header2");

  drawSpeechTable(svg, "R" ,0, 8, w / 2 - 5, 12);
  drawSpeechTable(svg, "L",  w / 2 + 5, 8, w / 2 - 5, 12);

  SVGForm.appendChild(svg);
}
