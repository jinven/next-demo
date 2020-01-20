import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    mouse = utils.captureMouse(canvas),
    ball = new Ball(20, "red");
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  var w = 0, h = 0;
  canvas.addEventListener('mousedown', function (event) {
    if (utils.containsPoint(ball.getBounds(), mouse.x, mouse.y)) {
      w = mouse.x - ball.x;
      h = mouse.y - ball.y;
      canvas.addEventListener('mouseup', onMouseUp, false);
      canvas.addEventListener('mousemove', onMouseMove, false);
    }
  }, false);
  function onMouseUp(event) {
    canvas.removeEventListener('mouseup', onMouseUp, false);
    canvas.removeEventListener('mousemove', onMouseMove, false);
  }
  function onMouseMove(event) {
    ball.x = mouse.x - w;
    ball.y = mouse.y - h;
  }
  (function dramFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(dramFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw(context);
  }())
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
      <canvas ref={canvasEl} width="400" height="400" style={{ background: '#000' }}></canvas>
    </div>
  )
}
