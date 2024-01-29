// تابع رسم خط بین سمبل های مربوط
import {
  svgNS,
  selectedSymbolObj,
  xFrequency,
  yIntensity,
  freqToXObj,
} from "../initials.js";

export default function drawCLine(container, localAudDataObj) {
  let symbol;
  let freq;
  // حرف اول آی‌دی کانتینر R || L
  let side = container.id[0];
  // const rootSymbol = ["R_AC", "R_BC"];
  const rootSymbol = [side + "_AC", side + "_BC"];
  // برای دو تا روت سمبل‌ها تکرار کن عملیات خط کشی را

  rootSymbol.forEach((rS) => {
    // ایجاد یک آبجکت از فرکانس - شدت مرتب شده بر اساس عدد فرکانس
    let cordObj = {};
    for (const side in localAudDataObj) {
      for (const symbol in localAudDataObj[side]) {
        if (symbol.substring(0, 4) == rS) {
          for (const freq in localAudDataObj[side][symbol]) {
            //اگر حرف آخر آر بود یعنی سمبل عدم پاسخ هست. پس به عنوان یک نشانه براش شدت غیرممکن ۱۴۰ میذاریم
            if (symbol.at(-1) == "R") {
              cordObj[+freq] = 140;
            } else {
              cordObj[+freq] = localAudDataObj[side][symbol][freq];
            }
          }
        }
      }
    }

    let line, x1, y1, x2, y2, lineColor, style;
    let lineCord = [];
    // واکشی در آبجکت مرتب شده فرکانس -شدت
    //ساختن یک آرایه دوبعدی از مختصات خط ها
    for (let freq in cordObj) {
      lineCord.push([freqToXObj[freq], cordObj[freq] + 20]);
    }

    //حالا خط کشی
    for (let i = 0; i < lineCord.length - 1; i++) {
      line = document.createElementNS(svgNS, "line");
      x1 = lineCord[i][0];
      y1 = lineCord[i][1];
      x2 = lineCord[i + 1][0];
      y2 = lineCord[i + 1][1];

      // let result = condition ? value1 : value2;
      lineColor = side == "R" ? "red" : "blue";
      // انتخاب استایل خط‌پر یا نقطه‌چین بر اساس روت‌سمبل راه هوایی یا راه استخوانی
      style =
        rS.substring(2) == "BC"
          ? "stroke-width: 0.5; stroke-opacity: 0.6; stroke-dasharray: 1;"
          : "stroke-width: 0.5; stroke-opacity: 0.6;";
      // از نشونه ای که موقع ساختن مختصات ساخته بودیم استفاده میکنیم عدد ۱۶۰ یعنی سمبل عدم پاسخ است
      if (y1 == 160 || y2 == 160) lineColor = "transparent";
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("stroke", lineColor);
      line.setAttribute("class", side + "_cl");
      line.setAttribute("style", style);
      container.appendChild(line);
    }
  });
}
