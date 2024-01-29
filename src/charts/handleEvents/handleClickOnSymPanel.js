import { selectedSymbolObj, prevSelectedSymbol } from "../initials.js";

// تابع هندل کردن کلیک روی پنل سمبل‌ها
export default function handleClickOnSymPanel(e) {
  const ix = e.target.id[0];

  // جابجایی مربع احاطه‌کننده روی سمبل انتخاب شده
  // obj["R"] = "R_AC"
  selectedSymbolObj[ix] = e.target.id;

  // مربع دور سمبل انتخاب شده قبلی رو بی رنگ کن
  document.getElementById(prevSelectedSymbol[e.target.id[0]]).style =
    "stroke: transparent;";

  // مربع دور سمبل انتخاب شده را رنگی کن
  document.getElementById(e.target.id).style = "stroke: green;";

  // نگهداری نام انتخاب شده برای بعد
  prevSelectedSymbol[ix] = selectedSymbolObj[ix];
}
