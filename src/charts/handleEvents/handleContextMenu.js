// وارد کردن توابع و داده‌های سراسری
import {
  selectedSymbolObj,
  xFrequency,
  yIntensity,
} from "../initials.js";

import {
  getAuthLocalCordinate,
  removePreSymbol,
} from "../functions/functions.js";

import { audDataObj } from "../dataObj.js";

// حذف سمبل قبلی
export default function handleContextMenu(e) {
  // مانع از نمایش منوی محتوا با کلیک راست یا کلید مخصوص کیبرد
  e.preventDefault();
  
  const NR = e.shiftKey; // بررسی فشردن کلید شیفت برای تغییر سمبل به عدم‌پاسخ
  const targetSVG = this; // آی‌دی اس‌وی‌جی راست یا چپ
  //به دست آوردن مختصات محلی نقطه کلیک شده (در اینجا صفحه ادیوگرام انتخاب شده)
  let xy = [];
  xy = getAuthLocalCordinate(e);
  const frequency = xFrequency[xy[0]]; // به‌دست آوردن فرکانس انتخاب شده
  const intensity = yIntensity[xy[1]]; // به دست آوردن شدت انتخاب شده

  const side = this.id[0]; // به‌دست آوردن راست یا چپ
  let symbol = selectedSymbolObj[this.id[0]]; // به‌دست آوردن رشته سمبل

  if (NR) symbol += "_NR"; //اصلاح رشته سمبل به عدم پاسخ در صورت انتخاب

  removePreSymbol(symbol, frequency); //حذف سمبل قبلی

  // insertSymbol(targetSVG, symbol, xy[0], xy[1]); // جاگذاری سمبل انتخاب شده
  delete audDataObj[side][symbol][frequency];

  //به‌روزرسانی یا ایجاد پراپرتی آبجکت ادیوگرام با مقدار فرکانس-شدت کلیک شده
  // audDataObj[side][symbol][frequency] = intensity;
  //برگشت آبجکت اطلاعات ادیوگرام
}
