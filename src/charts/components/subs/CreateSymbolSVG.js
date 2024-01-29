
// ساخت اس‌وی‌جی شانزده سمبل
export default function CreateSymbolSVG({ symbol }) {
  // symbol = "L_AC_NR";
  let r = 12 / 5;
  let dot = [],
    points = [],
    dx,
    xNR,
    yNR,
    symbolSVG = [];
  switch (symbol) {
    case "R_AC":
    case "R_AC_NR":
      dot = [0, 0];
      //مختصات نقطه اول سمبل عدم پاسخ
      xNR = r * Math.sin(Math.PI / 4);
      yNR = xNR;
      xNR *= -1;

      symbolSVG.push(<circle cx={0} cy={0} r={r} key={1}/>);
      break;
    case "R_AC_M":
    case "R_AC_M_NR":
      // dx = (3 / 2) * r * Math.tan(Math.PI / 6);
      // dy = r / 2;

      // // ذخیره مختصات مبدا علامت بدون پاسخ
      // xNR = -dx + x;
      // yNR = dy + y;
      dx = 2 * r * Math.tan(Math.PI / 6);

      points = [0, -r, dx, r, -dx, r, 0, -r];

      symbolSVG.push(
        <polyline strokeLinecap="round" strokeLinejoin="0" points={points} key={1} />
      );
      //مختصات نقطه اول سمبل عدم پاسخ
      xNR = -dx;
      yNR = r;
      break;
    case "R_BC":
    case "R_BC_NR":
      // مقدار جابجایی سمبل از مرکز
      dx = -r / 1.5;

      //مختصات نقطه اول سمبل عدم پاسخ
      xNR = dx;
      yNR = r;

      dot = [0, -r, -r, 0, 0, r];
      points = [dot[0] + dx, dot[1], dot[2] + dx, dot[3], dot[4] + dx, dot[5]];
      symbolSVG.push(<polyline points={points}  key={1} />);
      break;
    case "R_BC_M":
    case "R_BC_M_NR":
      // مقدار جابجایی سمبل از مرکز
      dx = -r / 1.5;

      dot = [0, -r, -r, -r, -r, r, 0, r];

      points = `${dot[0] + dx}, ${dot[1]}, 
                    ${dot[2] + dx}, ${dot[3]}, 
                    ${dot[4] + dx}, ${dot[5]}, 
                    ${dot[6] + dx}, ${dot[7]} 
                    `;
      symbolSVG.push(<polyline points={points} key={1}/>);
      //مختصات نقطه اول سمبل عدم پاسخ
      xNR = -r + dx;
      yNR = r;
      break;
    case "L_AC":
    case "L_AC_NR":
      //مختصات نقطه اول سمبل عدم پاسخ
      xNR = r;
      yNR = r;

      // const x1 = (Math.sqrt(2) / 2) * r;
      // const y1 = -x1;
      // dot = [x1, y1, -x1, -y1, -x1, y1, x1, -y1];
      points = [-r, -r, r, r];
      symbolSVG.push(<polyline points={points} key={1}/>);
      points = [r, -r, -r, r];
      symbolSVG.push(<polyline points={points} key={2} />);
      break;
    case "L_AC_M":
    case "L_AC_M_NR":
      dot = [0, 0];
      //مختصات نقطه اول سمبل عدم پاسخ
      xNR = r;
      yNR = r;

      // مختصات چهار نقطه مربع سمبل
      dot = [-r, -r, r, -r, r, r, -r, r, -r, -r];
      symbolSVG.push(<polyline points={dot} strokeLinecap="round" />);

      break;
    case "L_BC":
    case "L_BC_NR":
      // مقدار جابجایی سمبل از مرکز
      dx = r / 1.5;
      //مختصات نقطه اول سمبل عدم پاسخ
      xNR = dx;
      yNR = r;
      dot = [0, -r, r, 0, 0, r];
      points = [dot[0] + dx, dot[1], dot[2] + dx, dot[3], dot[4] + dx, dot[5]];
      symbolSVG.push(<polyline points={points} />);
      break;
    case "L_BC_M":
    case "L_BC_M_NR":
      // مقدار جابجایی سمبل از مرکز
      dx = r / 1.5;
      //مختصات نقطه اول سمبل عدم پاسخ
      xNR = r + dx;
      yNR = r;
      dot = [0, -r, r, -r, r, r, 0, r];
      points = `${dot[0] + dx}, ${dot[1]},
                    ${dot[2] + dx}, ${dot[3]},
                    ${dot[4] + dx}, ${dot[5]},
                    ${dot[6] + dx}, ${dot[7]}
                  `;
      symbolSVG.push(<polyline points={points} />);
      break;
    default:
      break;
  }
  //رسم قسمت NR
  if (getLastLetters(symbol) === "NR") {
    symbolSVG.push(createNRSVG(symbol[0], xNR, yNR));
    // تابع ایجاد تصویر عدم پاسخ
    function createNRSVG(side, x, y) {
      // let symColor = side === "R" ? "red" : "blue";
      let angle = side === "R" ? "135" : "45";
      const a = r / 2;
      const x1 = a * Math.cos(Math.PI / 6);
      const y1 = a * Math.sin(Math.PI / 6);
      // مختصات سه نقطه فلش
      //A, B, C
      let points = [-x1 + r + x, -y1 + y, r + x, y, -x1 + x + r, y1 + y];
      symbolSVG.push(
        <polyline
          points={points}
          strokeWidth="0.4px"
          transform={`rotate(${angle} ${x} ${y})`}
          key={3}
        />
      );
      // مختصات خط فلش
      points = [x, y, x + r, y];
      symbolSVG.push(
        <polyline
          points={points}
          strokeWidth="0.4px"
          transform={`rotate(${angle} ${x} ${y})`}
          key={4}
        />
      );
    }
  }
  const output = (
    <>
      <svg viewBox="-6 -6 12 12">
        {/* یک بوردر راهنما برای اس‌ وی جی به تمام پهنا و ارتفاع رسم می‌کنیم */}
        <rect x={-6} y={-6} width={12} height={12} stroke="black" fill="none" />
        <g
          strokeWidth={"0.6px"}
          fill="none"
          stroke={symbol[0] === "R" ? "red" : "blue"}
        >
          {symbolSVG}
        </g>
      </svg>
    </>
  );
  return output;
}

// تابع برگردادندن دو حرف آخر
function getLastLetters(symbol) {
  const l = symbol.length;
  return symbol[l - 2] + symbol[l - 1];
}
