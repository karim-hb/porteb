// وارد کردن داده‌های سراسری
import {
  h,
  r,
  svgNS,
  selectedSymbolObj,
  xFrequency,
  yIntensity,
  symbolType,
  currentAuthLocal,
  userXOrigin,
  viewBoxWidth,
  ratio,
  userYOrigin,
  viewBoxHeight,
  dI,
  dotX,
  dotY,
} from "../initials.js";

import { audDataObj } from "../dataObj.js";

// import createSymbolSVG from "./createSymbolSVG.js";

// تابع دریافت یک رویداد و برگشت مختصات محلی مجاز

function getAuthLocalCordinate(e) {
  // فراخوانی ایونت اصلی در ری‌اکت از اینجا به دست میاد
  // e.nativeEvent
  // const offsetX = e.nativeEvent.offsetX;
  // const offsetY = e.nativeEvent.offsetY;

  const offsetX = e.offsetX;
  const offsetY = e.offsetY;
  let xy = [];
  // console.log(offsetX, offsetY);
  xy[0] = toLocalX(offsetX);
  xy[1] = toLocalY(offsetY);


  xy[0] = getNearestNumber(xy[0], dotX);
  xy[1] = getNearestNumber(xy[1], dotY);
  // console.log(xy[0], xy[1]);
  return xy;
}

// تبدیل مختصات x پیکسلی به مختصات رند x کاربر

function toLocalX(x) {
  let userX = ratio * x + userXOrigin;
  let roundUserX = Math.round(userX);
  return roundUserX;
}

// تبدیل مختصات y پیکسلی به مختصات رند y کاربر

function toLocalY(y) {
  let userY = ratio * y + userYOrigin;
  let roundUserY = Math.round(userY);
  return roundUserY;
}

//تابع  رو به نام جدید بازنویسی می‌کنم
// دریافت یک عدد و یک آرایه عدد و و پیدا کردن نزدیک ترین عدد آرایه به عدد دریافتی و برگرداندن آن

function getNearestNumber(a, arr) {
  let i = 0;
  let l = arr.length;
  // اول پیدا کردن دو عدد احاطه کننده عدد مورد سوال
  while (a > arr[i] && i < l - 1) {
    i++;
  }
  if (a - arr[i - 1] <= arr[i] - a) {
    return arr[i - 1];
  } else return arr[i];
}

// تابع قرار دادن سمبل انتخاب شده در نقطه مورد نظر
// انتقال به فایل جداگانه
// function insertSymbol(svg, symbol, x, y) {
//   const g = document.createElementNS(svgNS, "g");
//   g.setAttribute("id", `${symbol}_${xFrequency[x]}`);
//   g.setAttribute("class", symbol);
//   g.appendChild(createSymbolSVG(symbol, x, y));
//   svg.appendChild(g);
// }

//تابع حذف سمبل قبلی ادیوگرام

function removePreSymbol(symbol, frequency) {
  // جداسازی ۴ حرف اول که میشود نام سمبل ریشه
  const rootSymbolName = symbol.substring(0, 4);

  // حرف اول سمبل که راست و چپ را میده
  const side = symbol[0];

  //آرایه ای از سمبل های هم‌ریشه سمبل انتخاب شده بساز
  const familySymbol = [
    rootSymbolName,
    `${rootSymbolName}_NR`,
    `${rootSymbolName}_M`,
    `${rootSymbolName}_M_NR`,
  ];

  // اگر سمبل‌های هم‌ریشه سمبل انتخابی در خط فرکانسی وجود داشت برو المنت سمبل قبلی رو پاک کن
  // R_AC, R_AC_M, R_AC_NR, R_AC_M_NR - sample family
  let preSymbolElement, preSymbol;

  familySymbol.forEach((sym) => {
    preSymbolElement = document.getElementById(sym + "-" + frequency);

    if (preSymbolElement != null) {
      preSymbol = preSymbolElement.classList[0];

      // اگر در یک خط فرکانسی سمبل قبلی و سمبل فعلی از یک زوح بودند قبلی رو از آبجکت ادیوگرام هم پاک کن
      //instance of pair Symbols: (R_AC, R_AC_NR) (L_BC_M, L_BC_M_NR)
      //سمبل‌های زوج فقط در قسمت NR با هم تفاوت دارند
      //کد زیر به نظر اضافه هست و کاری انجام نمیده
      if (isPair(symbol, preSymbol)) {
        delete audDataObj[side][preSymbol][frequency];
      }
      // حذف سمبل قبلی هم‌خانواده از دام
      preSymbolElement.remove();
      delete audDataObj[side][preSymbol][frequency];
    }
  });
}

// تابع تشخیص دو سمبل جفت

function isPair(s1, s2) {
  let greaterS, smallerS;
  // رشته بزرگ تر رو پیدا کن
  // اگر دو حرف آخرش ان‌آٰر نیست فالس رو برگردون
  //از رشته پیدا شده خط تیره ان‌آر رو حذف کن
  //اگر این رشته با رشته دیگه برابر هست ترو رو برگردون وگرنه فالس
  if (s2 == s1) return false;
  if (s2.length > s1.length) {
    greaterS = s2;
    smallerS = s1;
  } else {
    greaterS = s1;
    smallerS = s2;
  }
  if (
    greaterS.includes(smallerS) &&
    greaterS.substring(greaterS.length - 2) == "NR"
  )
    return true;

  return false;
}

// فراخوانی تابع جابجایی دایره راهنما

// function moveDirector(side, x, y, symbol) {
//   switch (side) {
//     case "R":
//       // آپدیت کردن آرایه نگهداری مختصات محلی مجاز جاری
//       currentAuthLocal["R"]["X"] = x;
//       currentAuthLocal.R.Y = y;

//       if (x != -1 && y != -1) {
//         // قرار دادن دایره دایرکتور در نقطه رند مجاز نزدیک به نشانگر موس
//         r_director.setAttribute("cx", x);
//         r_director.setAttribute("cy", y);
//       }
//       break;
//     case "L":
//       // آپدیت کردن آرایه نگهداری مختصات محلی مجاز جاری
//       currentAuthLocal["L"]["X"] = x;
//       currentAuthLocal.L.Y = y;

//       if (x != -1 && y != -1) {
//         // قرار دادن دایره دایرکتور در نقطه رند مجاز نزدیک به نشانگر موس
//         l_director.setAttribute("cx", `${x}`);
//         l_director.setAttribute("cy", `${y}`);
//       }
//       break;
//     default:
//       break;
//   }
// }

// فراخوانی تابع جابجایی دایره راهنما

function moveDirector(side, x, y, elem) {
  // // elem = document.getElementById("director");
  // console.log(elem);
  // آپدیت کردن آرایه نگهداری مختصات محلی مجاز جاری
      currentAuthLocal[side]["X"] = x;
      currentAuthLocal[side]["Y"] = y;

      if (x !== -1 && y !== -1) {
        // قرار دادن دایره دایرکتور در نقطه رند مجاز نزدیک به نشانگر موس
        elem.setAttribute("cx", x);
        elem.setAttribute("cy", y);
      }

  // switch (side) {
  //   case "R":
  //     // آپدیت کردن آرایه نگهداری مختصات محلی مجاز جاری
  //     currentAuthLocal["R"]["X"] = x;
  //     currentAuthLocal.R.Y = y;

  //     if (x !== -1 && y !== -1) {
  //       // قرار دادن دایره دایرکتور در نقطه رند مجاز نزدیک به نشانگر موس
  //       elem.setAttribute("cx", x);
  //       elem.setAttribute("cy", y);
  //     }
  //     break;
  //   case "L":
  //     // آپدیت کردن آرایه نگهداری مختصات محلی مجاز جاری
  //     currentAuthLocal["L"]["X"] = x;
  //     currentAuthLocal.L.Y = y;

  //     if (x !== -1 && y !== -1) {
  //       // قرار دادن دایره دایرکتور در نقطه رند مجاز نزدیک به نشانگر موس
  //       elem.setAttribute("cx", x);
  //       elem.setAttribute("cy", y);
  //     }
  //     break;
  //   default:
  //     break;
  // }
}

export {
  getAuthLocalCordinate,
  toLocalX,
  toLocalY,
  getNearestNumber,
  removePreSymbol,
  moveDirector,
};
