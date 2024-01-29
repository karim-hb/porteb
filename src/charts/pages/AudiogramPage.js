import Audiogram from "../components/Audiogram.js";
import SymbolPanel from "../components/SymbolPanel.js";
import FillAudiogram from "../components/FillAudiogram.js";
import GetDataObjbutton from "../components/GetDataObjButton.js";
import { audDataObj } from "../dataObj-sample.js";
import { useLayoutEffect, useState } from "react";
import getDataObj from "../functions/getDataObj.js";

const AudiogramPage = ({ selectedCase, selectedIndex, patients, allItems }) => {
  const [symbols, setSymbols] = useState({
    RSymPanel: {},
    LSymPanel: {},
    finded: false,
  });
  useLayoutEffect(() => {
    var temp = [...allItems[selectedIndex]?.cases];
    var finded = temp?.find((item) => item?.id === selectedCase);

    if (finded && finded?.cases?.audDataObj) {
      setSymbols({
        RAudSVG: finded?.cases?.audDataObj,
        LAudSVG: finded?.cases?.audDataObj,
        finded: true,
      });
    }
  }, []);
  const reutrnObjects = async () => {
    var temp = [...allItems[selectedIndex]?.cases];
    var index = temp?.findIndex((item) => item?.id === selectedCase);
    temp[index] = {
      ...temp[index],
      cases: { ...temp[index].cases, audDataObj: getDataObj("audDataObj") },
    };
    await patients.update(allItems[selectedIndex].id, {
      patinet_name: allItems[selectedIndex].patinet_name,
      doctor: allItems[selectedIndex].doctor,
      age: allItems[selectedIndex].age,
      updated_date: allItems[selectedIndex]?.updated_date,
      cases: temp,
    });
  };
  return (
    <div className="App">
      <div className="flex">
        <SymbolPanel id="RSymPanel" />
        <SymbolPanel id="LSymPanel" />
      </div>
      {/* کامپوننت پرکردن ادیوگرام */}
      {symbols?.finded && (
        <>
          {" "}
          <FillAudiogram id="RAudSVG" dataObj={symbols.RAudSVG} />
          <FillAudiogram id="LAudSVG" dataObj={symbols.LAudSVG} />
        </>
      )}
      {/* کامپوننت نمایش دکمه دریافت داده‌های وارد شده و نمایش در کنسول */}
      {/*       <GetDataObjbutton />
       */}
      <div onMouseLeave={() => reutrnObjects()} className="flex">
        <Audiogram
          id="RAudSVG"
          x={0}
          y={0}
          w={700}
          media="page"
          dataObj={{ R_AC: { 250: "15" } }}
        />
        <Audiogram id="LAudSVG" x={0} y={0} w={700} media="page" />
      </div>
    </div>
  );
};

export default AudiogramPage;
