// پر کردن صفحه ادیوگرام با سمبل ها
import { freqToXObj, xFrequency } from "../initials.js";
// import { audDataObj } from "../dataObj-sample.js";
import insertSymbol from "./insertSymbol.js";
import drawCLine from "./drawCLine.js";
import { audDataObj } from "../dataObj.js";

export default function fillAudiogram(container, localAudDataObj) {
    // insertSymbol(container, "R_AC", 0, 0, 16, 16, "");

  // تعریف یک آبجکت خالی با الگوی پراپرتی های آبجکت گلوبال
  let emptyObj = { R: {}, L: {} };

  // // خالی شدن کامل آبجکت گلوبال
  Object.assign(audDataObj, emptyObj);
  // // آپدیت کردن آبجکت گلوبال با مقدار وارد به فانکشن
  Object.assign(audDataObj, localAudDataObj);
  // return "filllll";
  const w = 16,
    h = 16;
  let x, y, id;
  // حرف اول آی‌دی کانتینر  R || L
  const side = container.id[0];

  // ایجاد یک آبجکت از فرکانس - شدت مرتب شده بر اساس عدد فرکانس
  for (const symbol in localAudDataObj[side]) {
    for (const freq in localAudDataObj[side][symbol]) {
      // مقدار عددی بیست برای تبدیل مقدار شدت به مختصات ایگرگ به کار رفته
      y = localAudDataObj[side][symbol][freq] + 20;
      x = freqToXObj[freq];
      id = `${symbol}-${xFrequency[x]}`;
      insertSymbol(container, symbol, x, y, w, h, id);
    }
  }
  drawCLine(container, localAudDataObj);
}
