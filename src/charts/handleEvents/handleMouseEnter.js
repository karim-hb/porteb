export default function handleMouseEnter(e) {
  e.target.focus({ focusVisible: true });
  const side = e.target.id[0];
  // پاک کردن دام لاین های کانکتور سمبلها
  // cl = Connector Line
  let cl = document.querySelectorAll("." + side + "_cl");
  for (const el of cl) el.remove();
}
