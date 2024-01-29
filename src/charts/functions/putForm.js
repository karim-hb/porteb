export default function putForm(container, w, h) {

  // console.log(container);

  const svgNS = "http://www.w3.org/2000/svg";
  let SVGForm = document.createElementNS(svgNS, "svg");
  // ضریب بستگی به رزولوشن صفحه نمایش دارد در فول اچ دی ۱۹۲۰ در ۱۰۸۰
  // بعدا این ضریب را از ارتفاع واقعی صفحه مرورگر محاسبه می‌کنیم
  // به طوری که در هیچ حالتی نیاز به اسکرول عمودی نباشه

  SVGForm.setAttribute("width", `${w * 3.3}`);
  SVGForm.setAttribute("height", `${h * 3.3}`);
  SVGForm.setAttribute("viewBox", `0 0 ${w} ${h}`)
  SVGForm.style = "background-color: antiquewhite; border: solid 1px blue";
  container.appendChild(SVGForm);
  return SVGForm;
}
