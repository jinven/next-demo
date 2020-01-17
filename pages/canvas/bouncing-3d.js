import { useRef, useEffect } from 'react'
import { Ball } from '../../utils/canvas/ball'
// import utils, { RotationToMouse } from '../../utils/animation.utils'
function run(canvas) {
  let isRuning = true
  const onLoad = function () {
    let context = canvas.getContext('2d'),
      ball = new Ball(20, 'red'),
      xpos = 0,
      ypos = 0,
      zpos = 0,
      vpX = canvas.width / 2,
      vpY = canvas.height / 2,
      vx = Math.random() * 2 - 1,
      vy = Math.random() * 2 - 1,
      vz = Math.random() * 2 - 1,
      fl = 250,
      top = -100,
      bottom = 100,
      left = -100,
      right = 100,
      front = -100,
      back = 100,
      bounce = -1;
    // context.fillStyle = "rgba(0,0,0,.03)";
    (function drawFrame() {
      if(!isRuning){
        return
      }
      window.requestAnimationFrame(drawFrame, canvas);
      // context.fillRect(0, 0, canvas.width, canvas.height);
      context.clearRect(0, 0, canvas.width, canvas.height);
      xpos += vx;
      ypos += vy;
      zpos += vz;
      //边界检查
      if (xpos + ball.radius > right) {
        xpos = right - ball.radius;
        vx *= bounce;
      } else if (xpos - ball.radius < left) {
        xpos = left + ball.radius;
        vx *= bounce;
      }
      if (ypos + ball.radius > bottom) {
        ypos = bottom - ball.radius;
        vy *= bounce;
      } else if (ypos - ball.radius < top) {
        ypos = top + ball.radius;
        vy *= bounce;
      }
      if (zpos + ball.radius > back) {
        zpos = back - ball.radius;
        vz *= bounce;
      } else if (zpos - ball.radius < front) {
        zpos = front + ball.radius;
        vz *= bounce;
      }
      //视场设置
      if (zpos > -fl) {
        var scale = fl / (fl + zpos);
        ball.scaleX = ball.scaleY = scale;
        ball.x = vpX + xpos * scale;
        ball.y = vpY + ypos * scale;
        ball.visible = true;
      } else {
        ball.visible = false;
      }
      if (ball.visible) {
        ball.draw(context);
      }
    }())
  }
  onLoad()
  return function () {
    isRuning = false
    console.log('disposing')
  }
}
function Bouncing3d() {
  const canvasEl = useRef(null)
  useEffect(() => run(canvasEl.current), [])
  return (
    <div>
      <canvas ref={canvasEl} width="400" height="400" style={{ background: '#000' }}></canvas>
    </div>
  )
}
Bouncing3d.getInitialProps = async () => {
  return {}
}
export default Bouncing3d
