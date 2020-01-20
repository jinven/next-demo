import { useRef, useEffect } from 'react'
import utils, { RotationToMouse } from '../../../utils/canvas/utils'
import { Arrow } from '../../../utils/canvas/arrow'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d');
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var mouse = utils.captureMouse(canvas);
  var arrow1 = new Arrow();
  var arrow2 = new Arrow();
  arrow1.x = centerX;
  arrow1.y = centerY;
  arrow2.x = centerX / 2;
  arrow2.y = centerY / 2;
  (function drawFrame() {
    if (!isRuning) {
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    arrow1.rotation = RotationToMouse(mouse.x, mouse.y, arrow1.x, arrow1.y); //角度变化
    arrow1.draw(context);
    arrow2.rotation = RotationToMouse(mouse.x, mouse.y, arrow2.x, arrow2.y); //角度变化
    arrow2.draw(context);
  })();
  return function () {
    isRuning = false
    console.log('disposing')
  }
}
export default function Collision() {
  const canvasEl = useRef(null)
  useEffect(() => run(canvasEl.current), [])
  return (
    <div>
      <canvas ref={canvasEl} width="500" height="500" style={{ background: '#000' }}></canvas>
    </div>
  )
}
