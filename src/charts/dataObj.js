// آبجکت داده دفتر
const officeDataObj = {
  names: [""],
  logos: [""],
  addresses: [""],
  tels: [""],
  audiometers: [""],
  tympanometers: [""],
};

// آبجکت دیتای مشخصات فردی مراجعه کننده
const patientDataObj = {
  name: "",
  lastName: "",
  gender: "",
  age: "",
  referrer: "",
  history: "",
  report: "",
};

// آبجکت دیتای ادیوگرام
const audDataObj = {
  R: {
    R_AC: {},
    R_BC: {},
    R_AC_M: {},
    R_BC_M: {},
    R_AC_NR: {},
    R_BC_NR: {},
    R_AC_M_NR: {},
    R_BC_M_NR: {},
  },
  L: {
    L_AC: {},
    L_BC: {},
    L_AC_M: {},
    L_BC_M: {},
    L_AC_NR: {},
    L_BC_NR: {},
    L_AC_M_NR: {},
    L_BC_M_NR: {},
  },
};

// آبجکت دیتای تست‌های گفتاری
const speechDataObj = {
  R: { SAT: "", SRT: "", MCL: "", UCL: "", SDS: "" },
  L: { SAT: "", SRT: "", MCL: "", UCL: "", SDS: "" },
};

// آبجکت دیتای تمپانومتری
const tympDataObj = {
  R: { ECV: "", SC: "", MEP: "", G: "" },
  L: { ECV: "", SC: "", MEP: "", G: "" },
};

// آبجکت دیتای رفلکس آکوستیک
const reflexDataObj = {
  R: { IPSI: {}, CONTRA: {} },
  L: { IPSI: {}, CONTRA: {} },
};

export {
  officeDataObj,
  patientDataObj,
  audDataObj,
  speechDataObj,
  tympDataObj,
  reflexDataObj,
};
