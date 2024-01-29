import { useEffect, useLayoutEffect, useRef } from "react";
import fillAudiogram from "../functions/fillAudiogram";

export default function FillAudiogram({ id, dataObj }) {
  function handleEvent() {
    fillAudiogram(document.getElementById(id), dataObj);
  }
  useLayoutEffect(() => {
    fillAudiogram(document.getElementById(id), dataObj);
  }, []);
  return (
    <>
      {/*  <button onMouseEnter={handleEvent}>
        Fill Audiogram from Data Object
      </button> */}
    </>
  );
}
