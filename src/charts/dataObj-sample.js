// آبجکت داده دفتر
const officeDataObj = {
    names: [`دفتر ارزیابی شنوایی و سمعک مهدی جاویدی (سروش)`],
    logos: ["../assets/logo.png"],
    addresses: ["مشهد، خیابان عارف، عارف ۲، ساختمان سینا، طبقه اول"],
    tels: ["۰۵۱۳۸۴۴۲۵۹۲", "05138423151"],
    audiometers: ["Pejvak Ava C952"],
    tympanometers: ["Pejvak Ava Z71"],
  },
  // آبجکت دیتای مشخصات فردی مراجعه کننده
  patientDataObj = {
    name: "مهدی",
    lastName: "جاویدی فیروز طوسی",
    gender: "مرد",
    age: "۴۶",
    referrer: "دکتر سید سراب الدین سرابی",
    history:
      "وزوز گوش گهگاهی  - سرگیجه گهگاهی - درد در ناحیه گردن - سابقه سرگیجه ۵ سال قبل",
    report:
      "کاهش شنوایی ملایم در فرکاس های زیر هر دو گوش - تکرار آزمون سالانه توصیه شد.",
  },
  // آبجکت دیتای ادیوگرام
  audDataObj = {
    R: {
      R_AC: { 250: 0, 500: 5, 1000: 10, 2000: 15, 4000: 15, 8000: 25 },
      R_BC: { 250: -5, 500: 0, 1000: 5, 2000: 10, 4000: 10 },
      R_AC_M: {},
      R_BC_M: {},
      R_AC_NR: {},
      R_BC_NR: {},
      R_AC_M_NR: {},
      R_BC_M_NR: {},
    },
    L: {
      L_AC: { 250: 0, 500: 5, 1000: 10, 2000: 15, 4000: 15, 8000: 25 },
      L_BC: { 250: -5, 500: 0, 1000: 5, 2000: 10, 4000: 10 },
      L_AC_M: {},
      L_BC_M: {},
      L_AC_NR: {},
      L_BC_NR: {},
      L_AC_M_NR: {},
      L_BC_M_NR: {},
    },
  },
  // آبجکت دیتای تست‌های گفتاری
  speechDataObj = {
    R: { SAT: "", SRT: "5", MCL: "35", UCL: "95", SDS: "100" },
    L: { SAT: "", SRT: "5", MCL: "40", UCL: "95", SDS: "96" },
  },
  // آبجکت دیتای تمپانومتری
  tympDataObj = {
    R: { Type: "C", ECV: "1.5", SC: "1.2", MEP: "-30", G: "0.5" },
    L: { Type: "An", ECV: "1.4", SC: "1.1", MEP: "-20", G: "0.6" },
  },
  // آبجکت دیتای رفلکس آکوستیک
  reflexDataObj = {
    R: {
      IPSI: { 500: 85, 1000: 90, 2000: "NR", 4000: "NR" },
      CONTRA: { 500: 85, 1000: 90, 2000: "NR" },
    },
    L: { IPSI: { 500: 85, 1000: 90, 2000: "95", 4000: "NR" }, CONTRA: {} },
  };

export {
  officeDataObj,
  patientDataObj,
  audDataObj,
  speechDataObj,
  tympDataObj,
  reflexDataObj,
};
