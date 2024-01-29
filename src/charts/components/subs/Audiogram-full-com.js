import { useRef } from "react";
import {
  h,
  r,
  linesCords,
  svgNS,
  selectedSymbolObj,
  xFrequency,
  yIntensity,
  symbolType,
  currentAuthLocal,
  userXOrigin,
  userYOrigin,
  viewBoxWidth,
  viewBoxHeight,
  ratio,
  dI,
  dotX,
  dotY,
} from "../initials.js";
import handleClick from "../handleEvents/handleClick.js";
import handleMouseMove from "../handleEvents/handleMouseMove.js";
import handleClickOnAudTable from "../handleEvents/handleClickOnAudTable.js";

function handleMouseLeave(e) {
  // console.log(e);
}

function Audiogram({ media, x, y, w, id }) {
  const directorRef = useRef(null);
  const audSVGRef = useRef(null);
  // x = 0;
  // y = 0;
  // w = 700;
  // id = "RAudSVG";
  const h = w;
  let lines = [];
  linesCords.forEach((cords, index) => {
    // ضخیم تر رسم کردن خطوط صفر و هزار
    const strokeWidth = cords.x1 === 60 || cords.y1 === 20 ? "1px" : "0.5px";
    // let strokeWidth = "1px";
    lines.push(
      <line
        x1={cords.x1}
        y1={cords.y1}
        x2={cords.x2}
        y2={cords.y2}
        style={{
          strokeWidth: strokeWidth,
          stroke: "black",
          strokeOpacity: "1",
        }}
        key={index}
      />
    );
  });
  // رسم دایره راهنمای در صورتی مدیا صفحه است. برای فرم و چاپ نیازی بهش نیست
  let director = "";
  if (media === "page") {
    director = <circle ref={directorRef} cx={0} cy={0} r={2} id="director" />;
  }
  // درج اعداد فرکانس اصلی 6 عدد
  // [x, y, F]
  const tf = [
    [20, -2, 250],
    [40, -2, 500],
    [60, -2, 1000],
    [80, -2, 2000],
    [100, -2, 4000],
    [120, -2, 8000],
  ];
  const freqTexts = [];
  tf.forEach((label, index) => {
    freqTexts.push(
      <text
        textAnchor="middle"
        x={label[0]}
        y={label[1]}
        style={{
          font: "5px Verdana, Helvetica, Arial, sans-serif",
          userSelect: "none",
        }}
        key={index}
      >
        {label[2]}
      </text>
    );
  });

  // درج اعداد شدتی اصلی 13 عدد
  //[x, y, I]
  const ti = [
    [-2, 12, -10],
    [-2, 22, 0],
    [-2, 32, 10],
    [-2, 42, 20],
    [-2, 52, 30],
    [-2, 62, 40],
    [-2, 72, 50],
    [-2, 82, 60],
    [-2, 92, 70],
    [-2, 102, 80],
    [-2, 112, 90],
    [-2, 122, 100],
    [-2, 132, 110],
    [-2, 142, 120],
  ];
  const intensTexts = [];
  ti.forEach((label, index) => {
    intensTexts.push(
      <text
        textAnchor="end"
        x={label[0]}
        y={label[1]}
        style={{
          font: "5px Verdana, Helvetica, Arial, sans-serif",
          userSelect: "none",
        }}
        key={index}
      >
        {label[2]}
      </text>
    );
  });

  const output = (
    <section style={{ display: "inline-block" }}>
      <svg
        ref={audSVGRef}
        onMouseLeave={(e) => {
          handleMouseLeave(e);
        }}
        onMouseMove={(e) => handleMouseMove(e, directorRef)}
        onClick={(e) => handleClickOnAudTable(e, audSVGRef)}
        id={id}
        x={x}
        y={y}
        width={w}
        height={h}
        viewBox={`${userXOrigin} ${userYOrigin} ${viewBoxWidth} ${viewBoxHeight}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* کادر دور راهنما */}
        <rect
          x={userXOrigin}
          y={userYOrigin}
          width={viewBoxWidth}
          height={viewBoxHeight}
          stroke="blue"
          fill="none"
          // strokeWidth="5"
        />
        {/* رسم خطوط */}
        {lines}
        {/* رسم دایره راهنما */}
        {director}
        {/* اعداد فرکانسی */}
        {freqTexts}
        {/* اعداد شدتی */}
        {intensTexts}
      </svg>
      <h2>{id}</h2>
      <h2>Mahdi</h2>
    </section>
  );
  return output;
}
export default Audiogram;
