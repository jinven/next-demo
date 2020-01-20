import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas, log) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    mouse = utils.captureMouse(canvas),
    ball_1 = new Ball(20, "#49f"),
    ball_2 = new Ball(20, "#f00");
  ball_2.x = canvas.width / 2;
  ball_2.y = canvas.height / 2;
  ball_1.draw(context);
  ball_2.draw(context);
  canvas.addEventListener('mousemove', function (e) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball_1.x = mouse.x;
    ball_1.y = mouse.y;
    var dx = ball_2.x - ball_1.x;
    var dy = ball_2.y - ball_1.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      log.innerHTML = '碰着了';
    } else {
      log.innerHTML = "";
    }
    ball_1.draw(context);
    ball_2.draw(context);
  }, false);
  return function () {
    isRuning = false
    console.log('disposing')
  }
}
export default function Collision() {
  const canvasEl = useRef(null)
  const textareaEl = useRef(null)
  useEffect(() => run(canvasEl.current, textareaEl.current), [])
  return (
    <div>
      <canvas ref={canvasEl} width="400" height="400" style={{ background: '#000' }}></canvas>
      <textarea ref={textareaEl} cols="30" rows="10"></textarea>
    </div>
  )
}
