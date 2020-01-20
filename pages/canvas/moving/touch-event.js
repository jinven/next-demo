import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas, log) {
  let isRuning = true
  var context = canvas.getContext('2d'), touch = utils.captureTouch(canvas);
  var ball = new Ball();
  ball.x = canvas.width / 2, ball.y = canvas.height / 2;
  ball.draw(context);
  function state(wrd) {
    if (utils.containsPoint(ball.getBounds(), touch.x, touch.y)) {
      log.value = "in ball :" + wrd;
    } else {
      log.value = "in canvas :" + wrd;
    }
  }
  canvas.addEventListener('touchstart', function (event) {
    event.preventDefault();
    state("touchstart");
    canvas.addEventListener('touchend', function (evnet) {
      evnet.preventDefault();
      log.value = "canvas : touchend";
    }, false);
    canvas.addEventListener('touchmove', function (event) {
      event.preventDefault();
      state("touchmove");
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
      <canvas ref={canvasEl} width="500" height="500" style={{ background: '#000' }}></canvas>
      <textarea ref={textareaEl} cols="30" rows="10"></textarea>
    </div>
  )
}
