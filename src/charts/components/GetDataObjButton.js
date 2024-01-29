import getDataObj from "../functions/getDataObj.js";
function GetDataObjbutton() {
  function handleEvent() {
    // نمایش آبجکت وارد شده در حافظه درخواستی در کنسول
    console.log(getDataObj("audDataObj"));
  }
  return (
    <>
      <button onMouseEnter={handleEvent}>
        Show audDataObj in Console
      </button>
    </>
  );
}

export default GetDataObjbutton;
