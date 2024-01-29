// تابع قرار دادن سمبل انتخاب شده در نقطه مورد نظر
// import { svgNS, xFrequency } from "./initials.js";
import createSymbolSVG from "./createSymbolSVG.js";

export default function insertSymbol(container, symbol, x, y, w, h , id) {
  // تعریف پهنای اس وی جی سمبل
  // const w = 10;
  // const h = w;
  const symbolSVG = createSymbolSVG(symbol);

  symbolSVG.setAttribute("x", x - w / 2);
  symbolSVG.setAttribute("y", y - h / 2);
  symbolSVG.setAttribute("width", w);
  symbolSVG.setAttribute("height", h);

  symbolSVG.setAttribute("id", id);
  symbolSVG.setAttribute("class", symbol);

  container.appendChild(symbolSVG);
}
