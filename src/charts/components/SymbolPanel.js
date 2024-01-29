import { useRef } from "react";
import { useEffect } from "react";
import drawSymbolPanel from "../functions/drawSymbolPanel";
import handleClickOnSymPanel from "../handleEvents/handleClickOnSymPanel";
export default function SymbolPanel({ id }) {
  const RSymPanelRef = useRef(null);
  // const LSymPanelRef = useRef(null);

  useEffect(() => {
    const RSymPanel = RSymPanelRef.current;
    drawSymbolPanel(RSymPanel, 0, 0, id);
  },[]);
  return (
    <>
      <section
        style={{ display: "inline-block" }}
        ref={RSymPanelRef}
        id={id}
        onClick={handleClickOnSymPanel}
      ></section>
      {/* <section
        style={{ display: "inline-block" }}
        ref={LSymPanelRef}
        id="LSymPanel"
        onClick={handleClickOnSymPanel}
      ></section> */}
    </>
  );
}
