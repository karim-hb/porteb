import { useRef, useEffect } from "react";
import drawAudTable from "../functions/drawAudTable.js";
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
import handleMouseLeave from "../handleEvents/handleMouseLeave.js";
import handleMouseEnter from "../handleEvents/handleMouseEnter.js";
import handleContextMenu from "../handleEvents/handleContextMenu.js";
import handleKeyDown from "../handleEvents/handleKeyDown.js";
import fillAudiogram from "../functions/fillAudiogram.js";
import drawDirector from "../functions/drawDirector.js";

function Audiogram({ media, x, y, w, id, dataObj }) {
  // console.log(dataObj);

  const directorRef = useRef(null);
  const audDivRef = useRef(null);

  useEffect(() => {
    const audDiv = audDivRef.current;
    // const directorDom = directorRef.current;
    drawAudTable(audDiv, x, y, w, id);
    const AudSVG = document.getElementById(id)
    drawDirector(AudSVG, id[0] + "Director");
    const director = document.getElementById(id[0] + "Director")
    AudSVG.addEventListener("click", (e) =>
      handleClickOnAudTable(e, AudSVG)
    );
    AudSVG.addEventListener("mousemove", (e) =>
      handleMouseMove(e, director)
    );
    AudSVG.addEventListener("mouseleave", handleMouseLeave);
    AudSVG.addEventListener("mouseenter", handleMouseEnter);
    AudSVG.addEventListener("contextmenu", handleContextMenu);
    AudSVG.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("click", handleClickOnAudTable);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseLeave);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [x, y, w, id]);

  // رسم دایره راهنمای در صورتی مدیا صفحه است. برای فرم و چاپ نیازی بهش نیست
  // let director = "";
  // if (media === "page") {
  //   director = (
  //     <circle ref={directorRef} cx={0} cy={0} r={1.5} id={id[0] + "Director"} />
  //   );
  // }

  const output = (
    <div
      // tabIndex={1}
      // id={id}
      // x={x}
      // y={y}
      // style={{ display: "inline-block" }}
      ref={audDivRef}
      // width={w}
      // height={w}
      // viewBox={`${userXOrigin} ${userYOrigin} ${viewBoxWidth} ${viewBoxHeight}`}
      // version="1.1"
      // xmlns="http://www.w3.org/2000/svg"
    >
      {/* <rect
        x={userXOrigin}
        y={userYOrigin}
        width={viewBoxWidth}
        height={viewBoxHeight}
        stroke="red"
        fill="none"
        className="gridLines"
      /> */}
      {/* {director} */}
    </div>
  );
  return output;
}
export default Audiogram;
