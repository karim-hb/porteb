import Preview from "../components/Preview.js";
// داده‌های ورودی از بانک اطلاعاتی که در اینجا از یک فایل نمونه است
import {
  officeDataObj,
  patientDataObj,
  audDataObj,
  speechDataObj,
  tympDataObj,
  reflexDataObj,
} from "../dataObj-sample.js";
const PreviewPage = () => {
  return (
    <>
      <div>
        <Preview
          officeDataObj={officeDataObj}
          patientDataObj={patientDataObj}
          audDataObj={audDataObj}
          speechDataObj={speechDataObj}
          tympDataObj={tympDataObj}
          reflexDataObj={reflexDataObj}
        />
      </div>
    </>
  );
};
export default PreviewPage;
