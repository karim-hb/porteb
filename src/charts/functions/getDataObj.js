import {
  audDataObj,
  officeDataObj,
  patientDataObj,
  speechDataObj,
  tympDataObj,
  reflexDataObj,
} from "../dataObj.js";

export default function getDataObj(objName) {
  switch (objName) {
    case "officeDataObj":
      return officeDataObj;
    case "patientDataObj":
      return patientDataObj;
    case "audDataObj":
      return audDataObj;
    case "speechDataObj":
      return speechDataObj;
    case "tympDataObj":
      return tympDataObj;
    case "reflexDataObj":
      return reflexDataObj;
    default:
      break;
  }
}
