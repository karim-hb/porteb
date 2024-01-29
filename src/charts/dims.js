// فاصله های قسمت های مختلف فرم چاپی
const dims = {
  edge: { top: 10, left: 10, right: 10, bottom: 10 },
  header: { width: 190, height: 20 },
  patientInfo: { width: 190, height: 30 },
  audiograms: { width: 190, height: 100 },
  audiogram: { width: 95, height: 95 },
  speech: { width: 190, height: 21 },
  tympanometry: { width: 190, height: 50 },
  acoustics: { width: 190, height: 30 },
  report: { width: 190, height: 20 },
  footer: { width: 190, height: 10 },
  A4: { width: 210, height: 297 },
};

export default dims;

// اندازه سکشن های مختلف فرم آ۴
const formWidht = 210,
  formHeight = 297;

const left = 10,
  right = 10;
const usableWidth = formWidht - (right + left); // عرض پس از کسر لبه‌های راست و چپ

const top = 10,
  headerHeight = 20,
  patientInfoHeight = 20,
  audiogramsHeight = 80,
  speechHeight = 20,
  tympanometryHeight = 40,
  acousticsHeight = 30,
  descriptionHeight = 25,
  footerHeight = 15,
  bottom = 10;

const usableHeight = formHeight - (top + bottom);

const headerWidth = usableWidth,
  patientInfoWidth = usableWidth,
  audiogramsWidth = usableWidth,
  speechWidth = usableWidth,
  tympanometrywidth = usableWidth,
  acousticsWidth = usableWidth,
  descriptionWidth = usableWidth,
  footerWidth = usableWidth;
