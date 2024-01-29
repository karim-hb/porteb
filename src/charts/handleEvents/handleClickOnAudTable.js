// وارد کردن توابع و داده‌های سراسری
import { selectedSymbolObj, xFrequency, yIntensity } from "../initials.js";

import {
  getAuthLocalCordinate,
  removePreSymbol,
} from "../functions/functions.js";
import insertSymbol from "../functions/insertSymbol.js";
import { audDataObj } from "../dataObj.js";

//تابع هندل کردن کلیک روی فرم ادیوگرام
export default function handleClickOnAudTable(e, dom) {
  const NR = e.shiftKey; // بررسی فشردن کلید شیفت برای تغییر سمبل به عدم‌پاسخ
  const targetSVG = dom; // آی‌دی اس‌وی‌جی راست یا چپ
  // console.log(targetSVG);
  // //به دست آوردن مختصات محلی نقطه کلیک شده (در اینجا صفحه ادیوگرام انتخاب شده)
  let xy = [];
  xy = getAuthLocalCordinate(e);
  const frequency = xFrequency[xy[0]]; // به‌دست آوردن فرکانس انتخاب شده
  const intensity = yIntensity[xy[1]]; // به دست آوردن شدت انتخاب شده
  const side = targetSVG.id[0]; // به‌دست آوردن راست یا چپ
  let symbol = selectedSymbolObj[side]; // به‌دست آوردن رشته سمبل
  if (NR) symbol += "_NR"; //اصلاح رشته سمبل به عدم پاسخ در صورت انتخاب
  removePreSymbol(symbol, frequency); //حذف سمبل قبلی
  insertSymbol(targetSVG, symbol, xy[0], xy[1], 12, 12, `${symbol}-${xFrequency[xy[0]]}`); // جاگذاری سمبل انتخاب شده
  // //به‌روزرسانی یا ایجاد پراپرتی آبجکت ادیوگرام با مقدار فرکانس-شدت کلیک شده
  audDataObj[side][symbol][frequency] = intensity;
  // console.log(audDataObj.R.R_AC);
  //برگشت آبجکت اطلاعات ادیوگرام
  // return audDataObj;
}
