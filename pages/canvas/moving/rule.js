import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Rule } from '../../../utils/canvas/rule'
function run(canvas, oP) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    cW = canvas.width,
    cH = canvas.height,
    ruleW = 1000,
    ruleH = 100,
    offsetX = 0,
    offsetY = 0;
  var isMouseDown = false, oldX = 0, oldY = 0, targetX; 
  var easing = 0.0005, start = false;
  var mouse = utils.captureMouse(canvas);
  var rule = new Rule(ruleW, ruleH);
  rule.x = 0;
  rule.y = canvas.height - ruleH;
  canvas.addEventListener('mousedown', function (e) {
    if (utils.containsPoint(rule.getBounds(), mouse.x, mouse.y)) {
      isMouseDown = true;
      offsetX = mouse.x - rule.x;
      offsetY = mouse.y - rule.y;
      oldX = rule.x;
      oldY = rule.y;
    }
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
  })
  function onMouseUp(event) {
    isMouseDown = false;
    targetX = mouse.x;
    start = true;
    //    rule.ax = rule.x - oldX;
    canvas.removeEventListener('mouseup', onMouseUp, false);
    canvas.removeEventListener('mousemove', onMouseMove, false);
  }
  function onMouseMove(event) {
    rule.x = mouse.x - offsetX;
    //    rule.y = mouse.y - offsetY;
  }
  function slide() {
  }
  function trackVelocity() {
    rule.vx = rule.x - oldX;
    //    console.log(rule.vx);
    oldX = rule.x;
    oldY = rule.y;

    oP.innerHTML = rule.vx;
  }
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (!isMouseDown && start) {
      var a = (targetX - rule.x) * easing;
      // var vy = (targetY - ball.y)*easing;
      rule.vx += a;
      rule.x += rule.vx;
      if (rule.vx < 0.0000001) {
        start = false;
      }
      // ball.y += vy;
    }
    rule.draw(context);
  })()
  return function () {
    isRuning = false
    console.log('disposing')
  }
}
export default function Collision() {
  const canvasEl = useRef(null)
  const spanEl = useRef(null)
  useEffect(() => run(canvasEl.current, spanEl.current), [])
  return (
    <div>
      <span>移动距离为：</span><span ref={spanEl}></span>
      <canvas ref={canvasEl} width="1000" height="600" style={{ background: '#000' }}></canvas>
    </div>
  )
}
