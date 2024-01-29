import { svgNS } from "../initials.js";
import dims from "../dims.js";
import drawTympTable from "./drawTympTable.js";

// قسمت دربرگیرنده تمپانوگرام ها و مقادیرش
export default function putTymp(SVGForm, dataObj) {
  const w = dims.tympanometry.width,
    h = dims.tympanometry.height;

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("x", dims.edge.left);
  svg.setAttribute(
    "y",
    dims.edge.top +
      dims.header.height +
      dims.patientInfo.height +
      dims.audiograms.height +
      dims.speech.height
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
  rect.setAttribute("stroke", "red");
  rect.setAttribute("stroke-width", "0.1mm");
  rect.setAttribute("class", "gridLines");
  svg.appendChild(rect);

  // عنوان
  let text = document.createElementNS(svgNS, "text");
  text.setAttribute("class", "header2");
  text.setAttribute("x", w / 2);
  text.setAttribute("y", 5);
  text.innerHTML = "TYMPANOMETRY";
  svg.appendChild(text);

  //قرار دادن هر جدول در وسط قسمت مربوط به خود
  const tw = (w * 40) / 100; // پهنای هر جدول تمپانوگرام
  const left = (w / 2 - tw) / 2;
  drawTympTable(svg, "R", left, 5, tw, dataObj);
  drawTympTable(svg, "L", w / 2 + left, 5, tw, dataObj);

  SVGForm.appendChild(svg);
}
