import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas, log) {
  let isRuning = true
  var context = canvas.getContext('2d');
  var mouse = utils.captureMouse(canvas);
  var ball = new Ball(20, "red");
  ball.x = canvas.width / 2; ball.y = canvas.height / 2;
  ball.draw(context);
  function state(wrd) {
    if (utils.containsPoint(ball.getBounds(), mouse.x, mouse.y)) {
      log.value = "in ball : " + wrd;
    } else {
      log.value = "canvas : " + wrd;
    }
  }
  canvas.addEventListener('mousedown', function (event) {
    state("mousedown");
    canvas.addEventListener('mouseup', function (event) {
      state("mouseup");
    }, false);
    canvas.addEventListener('mousemove', function (event) {
      state("mousemove");
    }, false);
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
