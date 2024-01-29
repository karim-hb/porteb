import drawAudTable from "./drawAudTable.js";
import { svgNS } from "../initials.js";
import dims from "../dims.js";

export default function putAudiogram(SVGForm) {

  const w = dims.audiograms.width,
    h = dims.audiograms.height;

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("x", dims.edge.left);
  svg.setAttribute("y", dims.edge.top + dims.header.height + dims.patientInfo.height);

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
  text.setAttribute("x", w/2);
  text.setAttribute("y", 5);
  text.innerHTML = "AUDIOGRAMS"
  svg.appendChild(text);



  drawAudTable(svg, 0, 5, 95, "RAudiogram");
  drawAudTable(svg, 95, 5, 95, "LAudiogram");


  SVGForm.appendChild(svg);

}
