import { removePreSymbol, moveDirector } from "../functions/functions.js";
import insertSymbol from "../functions/insertSymbol.js";
// وارد کردن داده‌های سراسری
import {
  selectedSymbolObj,
  xFrequency,
  yIntensity,
  currentAuthLocal,
} from "../initials.js";

import { audDataObj } from "../dataObj.js";

// تابع هندل رویداد پایین نگه داشتن کلید
export default function handleKeyDown(e) {
  // console.log(dom);
  // برای جلوگیری از رفتار پیش‌فرض کلیدهای جهت نما که باعث حرکت صفحه می‌شود
  e.preventDefault();
  const NR = e.shiftKey;
  // console.log(NR);
  // console.log(this);
  // const targetSVG = this; // آی‌دی اس‌وی‌جی راست یا چپ
  const targetSVG = e.target; // آی‌دی اس‌وی‌جی راست یا چپ

  const side = targetSVG.id[0]; // به‌دست آوردن راست یا چپ
  let dom = document.getElementById( side + "Director");

  console.log(side);
  // //به دست آوردن مختصات محلی پیکسلی المنت  (در اینجا صفحه ادیوگرام انتخاب
  const x = currentAuthLocal[side]["X"];
  const y = currentAuthLocal[side]["Y"];
  // let symbol = selectedSymbolObj[this.id[0]]; // به‌دست آوردن رشته سمبل
  let symbol = selectedSymbolObj[side]; // به‌دست آوردن رشته سمبل

  const frequency = xFrequency[x]; // به‌دست آوردن فرکانس انتخاب شده
  const intensity = yIntensity[y]; // به دست آوردن شدت انتخاب شده

  if (NR) symbol += "_NR"; //اصلاح رشته سمبل به عدم پاسخ در صورت انتخاب

  switch (e.keyCode) {
    case 13: // Space Key
    case 32: // Enter Key
      // handleClickOnAudTable(e);
      removePreSymbol(symbol, frequency); //حذف سمبل قبلی
      insertSymbol(
        targetSVG,
        symbol,
        x,
        y,
        12,
        12,
        `${symbol}-${xFrequency[x]}`
      ); // جاگذاری سمبل انتخاب شده
      //به‌روزرسانی یا ایجاد پراپرتی آبجکت ادیوگرام با مقدار فرکانس-شدت کلیک شده
      audDataObj[side][symbol][frequency] = intensity;
      break;
    case 37: // Left Arrow
    case 38: // Up Arrow
    case 39: // Right Arrow
    case 40: // Down Arrow
      // فراخوانی تابع هندل کلیدهای جهت نما
      handleArrowKeyDown(side, e.keyCode);
      break;
    case 18: // Alt Key
      // تغییر سمبل انتخاب شده
      selectedSymbolObj.R = "R_BC";
      break;
    default:
      break;
  }
  // تابع پایینی را به داخل این تابع آوردیم تا نیاز به پاسکاری اضافه پارامترها نباشه
  // فراخوانی تابع هندل کلیدهای جهت نما
  function handleArrowKeyDown(side, keyCode) {
    const authXArray = [20, 40, 53, 60, 73, 80, 93, 100, 113, 120];
    const ix = authXArray.indexOf(currentAuthLocal[side]["X"]);

    switch (keyCode) {
      case 37: // Left Arrow
        if (authXArray[ix] > 20)
          moveDirector(
            side,
            authXArray[ix - 1],
            currentAuthLocal[side]["Y"],
            dom
          );
        break;
      case 38: // Up Arrow
        moveDirector(
          side,
          currentAuthLocal[side]["X"],
          currentAuthLocal[side]["Y"] - 5,
          dom
        );
        break;
      case 39: // Right Arrow
        if (authXArray[ix] < 120)
          moveDirector(
            side,
            authXArray[ix + 1],
            currentAuthLocal[side]["Y"],
            dom
          );
        break;
      case 40: // Down Arrow
        moveDirector(
          side,
          currentAuthLocal[side]["X"],
          currentAuthLocal[side]["Y"] + 5,
          dom
        );
        break;
      default:
        break;
    }
    // console.log(keyCode);
  }
}
