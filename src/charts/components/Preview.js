import putForm from "../functions/putForm.js";
import putHeader from "../functions/putHeader.js";
import "../styles.css";
import putPatientInfo from "../functions/putPatientInfo.js";
import putAudiogram from "../functions/putAudiogram.js";
import putSpeech from "../functions/putSpeech.js";
import putTymp from "../functions/putTymp.js";
import putReflex from "../functions/putReflex.js";
import putReport from "../functions/putReport.js";
import fillAudiogram from "../functions/fillAudiogram.js";

import { useRef, useEffect } from "react";
export default function Preview({
  officeDataObj,
  patientDataObj,
  audDataObj,
  speechDataObj,
  tympDataObj,
  reflexDataObj,
}) {
  const formRef = useRef(null);
  useEffect(() => {
    console.log(formRef.current);
    const svgForm = putForm(formRef.current, 210, 298);
    console.log(svgForm);
    putHeader(svgForm, officeDataObj);
    putPatientInfo(svgForm, patientDataObj);
    putAudiogram(svgForm);
    const RAudiogram = document.getElementById("RAudiogram");
    const LAudiogram = document.getElementById("LAudiogram");
    fillAudiogram(RAudiogram, audDataObj);
    fillAudiogram(LAudiogram, audDataObj);
    putSpeech(svgForm);
    putTymp(svgForm, tympDataObj);
    putReflex(svgForm);
    putReport(svgForm, patientDataObj);
  }, []);

  return (
    <>
      <div ref={formRef} id="form"></div>
    </>
  );
}
