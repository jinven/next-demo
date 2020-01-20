import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas, log) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    mouse = utils.captureMouse(canvas),
    ball = new Ball();
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  var ballBounds = ball.getBounds();
  ball.draw(context);
  canvas.addEventListener('mousemove', function (e) {
    var dx = Math.abs(mouse.x - ball.x);
    var dy = Math.abs(mouse.y - ball.y);
    var distance = Math.sqrt(dx * dx + dy * dy);
    console.log(distance);
    if (distance < ball.radius) {
      log.value = '碰着了';
    } else {
      log.value = '';
    }
    /*if(utils.containsPoint(ballBounds, mouse.x, mouse.y)){
        log.value = '碰着了';
    }else{
        log.value = '';
    }*/
  }, false);
  return function () {
    isRuning = false
    console.log('disposing')
  }
}
export default function Collision() {
  const canvasEl = useRef(null)
  const pEl = useRef(null)
  useEffect(() => run(canvasEl.current, pEl.current), [])
  return (
    <div>
      <canvas ref={canvasEl} width="500" height="500" style={{ background: '#000' }}></canvas>
      <p ref={pEl}>没撞上</p>
      <style jsx>{`
        p{
          position: absolute;
        }
      `}</style>
    </div>
  )
}
