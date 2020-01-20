import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas, log) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    mouse = utils.captureMouse(canvas),
    ballA = new Ball(50, "#ff0000"),
    ballB = new Ball(50, "#ffff00");
  ballA.x = canvas.width / 2;
  ballA.y = canvas.height / 2;
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ballB.x = mouse.x;
    ballB.y = mouse.y;
    if (utils.intersects(ballA.getBounds(), ballB.getBounds())) {
      log.innerHTML = "撞上了";
    } else {
      log.innerHTML = "没撞上";
    }
    var boundsA = ballA.getBounds(),
      boundsB = ballB.getBounds();
    context.strokeStyle = "white";
    context.strokeRect(boundsA.x, boundsA.y, boundsA.width, boundsA.height);
    context.strokeRect(boundsB.x, boundsB.y, boundsB.width, boundsB.height);
    ballA.draw(context);
    ballB.draw(context);
  }())
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
      <p ref={pEl}></p>
      <style jsx>{`
        p{
          position: absolute;
          color: aliceblue;
          top:10px; left: 220px;
        }
      `}</style>
    </div>
  )
}
