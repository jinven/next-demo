import { useRef, useEffect } from 'react'
function run(canvas, btnGroup, btnColor) {
  let isRuning = true
  var ctx = canvas.getContext('2d'),
    W = canvas.width,
    H = canvas.height;
  var waterLine = 250, //水面高度
    waterTop = 50,   //水波峰值
    angle = 0,
    speed = 0,         // 移动速度
    lineNum = W,     //线条数目
    color = "#4411ff",
    speedChange = 0.03,
    angleChange = 0.005;
  //事件绑定
  btnGroup.addEventListener('click', function (e) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    switch (target.dataset.id) {
      case "speedp":
        speedChange += 0.01;
        break;
      case "speedd":
        speedChange -= 0.01;
        break;
      case "heightp":
        waterTop += 10;
        break;
      case "heightd":
        waterTop -= 10;
        break;
      case "widthp":
        angleChange += 0.001;
        break;
      case "widthd":
        angleChange -= 0.001;
        break;
    }
  })
  btnColor.addEventListener('click', function (e) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    switch (target.dataset.id) {
      case "color1":
        color = "#D01257";
        break;
      case "color2":
        color = "#4411ff";
        break;
      case "color3":
        color = "#FBB448";
        break;
    }
  })
  //绘制函数
  const draw = function (angle) {
    for (var i = 0; i < lineNum; i++) {
      var point = {
        x: i,
        y: waterLine + Math.sin(angle + speed) * waterTop
      };
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = color;
      ctx.moveTo(point.x, 500);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
      angle += angleChange
    }
    speed += speedChange;
  };
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    ctx.clearRect(0, 0, W, H);
    draw(angle);
  })()
  return function () {
    isRuning = false
    console.log('disposing')
  }
}
export default function Collision() {
  const canvasEl = useRef(null)
  const btnGroupEl = useRef(null)
  const colorEl = useRef(null)
  useEffect(() => run(canvasEl.current, btnGroupEl.current, colorEl.current), [])
  return (
    <div>
      <div className="btn-group" ref={btnGroupEl} style={{ marginBottom: 10 }}>
        <input type="button" data-id="speedp" value="Speed +" />
        <input type="button" data-id="speedd" value="Speed -" />
        <input type="button" data-id="heightp" value="Height +" />
        <input type="button" data-id="heightd" value="Height -" />
        <input type="button" data-id="widthp" value="Width +" />
        <input type="button" data-id="widthd" value="Width -" />
      </div>
      <div className="color-group" ref={colorEl} style={{ position: 'absolute', marginBottom: -50, marginLeft: 10 }}>
        <div data-id="color1" style={{ background: '#d01257' }}></div>
        <div data-id="color2" style={{ background: '#4411ff' }}></div>
        <div data-id="color3" style={{ background: '#fbb448' }}></div>
      </div>
      <canvas ref={canvasEl} width="500" height="400" style={{ background: '#fff', border: '1px solid #444' }}></canvas>
      <style jsx>{`
        .color-group div {
          width: 20px;
          height: 10px;
          display:inline-block;
        }
      `}</style>
    </div>
  )
}
