import { getAuthLocalCordinate, moveDirector } from "../functions/functions.js";

export default function handleMouseMove(e, dom) {
  // console.log(e.nativeEvent.offsetY);
  const xy = getAuthLocalCordinate(e);
  const x = xy[0],
    y = xy[1];
  const side = dom.id[0];

  // فراخوانی تابع جابجایی دایره راهنما
  moveDirector(side, x, y, dom);
}
