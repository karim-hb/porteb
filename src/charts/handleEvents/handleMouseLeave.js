//داده های خروجی به بانک اطلاعاتی
import { audDataObj } from "../dataObj.js";
import drawCLine from "../functions/drawCLine.js";

export default function handleMouseLeave(e) {
  // console.log(e.target);
  // بین سمبل های مربوط خط رسم کن
  drawCLine(e.target, audDataObj);

  // مقادیر آبجکت را در بانک اطلاعاتی ذخیره کن
  // ......}
}
