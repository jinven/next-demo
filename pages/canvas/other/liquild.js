import { useRef, useEffect } from 'react'
function Vertex(x, y, baseY) {
  this.baseY = baseY;
  this.x = x;
  this.y = y;
  this.vy = 0;
  this.targetY = 0;
  this.friction = 0.15;
  this.deceleration = 0.95;
}
Vertex.prototype.updateY = function (diffVal) {
  this.targetY = diffVal + this.baseY;
  this.vy += (this.targetY - this.y);
  this.vy *= this.deceleration;
  this.y += this.vy * this.friction;
}
let color1 = "#6ca0f6";
let color2 = "#367aec";
function run(canvas) {
  let isRuning = true
  var ctx = canvas.getContext('2d');
  var W = window.innerWidth;
  var H = window.innerHeight;
  var vertexes = [],    //顶点坐标
    verNum = 250,     //顶点数
    diffPt = [],      //差分值
    autoDiff = 1000;  //初始差分值
  canvas.width = W;
  canvas.height = H;
  var vPos = 125;  //震荡点
  var dd = 15;     //缓冲
  // 生成顶点，初始差分值
  for (var i = 0; i < verNum; i++) {
    vertexes[i] = new Vertex(W / (verNum - 1) * i, H / 2, H / 2);
    diffPt[i] = 0;
  }
  console.log(vertexes);
  //console.log(diffPt);
  //鼠标滚轮
  const onMouseWheel = function (e) {
    var s = (e.detail) ? -e.detail : e.wheelDelta;
    s > 0 ? (dd > 15 ? dd-- : dd = dd) : (dd < 50 ? dd++ : dd = dd);
    console.log(dd)
  };
  const onMouseDown = function (e) {
    var mouse = { x: null, y: null };
    if (e.pageX || e.pageY) {
      mouse.x = e.pageX;
      mouse.y = e.pageY;
    } else {
      mouse.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      mouse.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    //重设差分值
    if (mouse.y > (H / 2 - 50) && mouse.y < (H / 2 + 50)) {
      autoDiff = 1000;
      vPos = 1 + Math.floor((verNum - 2) * mouse.x / W);
      diffPt[vPos] = autoDiff;
    }
    console.log(mouse.x, mouse.y)
  }
  const resize = function () {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  }
  window.addEventListener('mousewheel', onMouseWheel);
  //鼠标点击
  canvas.addEventListener('mousedown', onMouseDown, false)
  //resize
  window.addEventListener("resize", resize);
  //绘制
  const draw = function () {
    ctx.save()
    ctx.fillStyle = color1;
    ctx.beginPath();
    ctx.moveTo(0, H);
    ctx.lineTo(vertexes[0].x, vertexes[0].y);
    for (var i = 1; i < vertexes.length; i++) {
      ctx.lineTo(vertexes[i].x, vertexes[i].y);
    }
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.fillStyle = color2;
    ctx.beginPath();
    ctx.moveTo(0, H);
    ctx.lineTo(vertexes[0].x, vertexes[0].y + 5);
    for (var i = 1; i < vertexes.length; i++) {
      ctx.lineTo(vertexes[i].x, vertexes[i].y + 5);
    }
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.fillStyle = "#777";
    ctx.font = "12px sans-serif";
    ctx.textBaseline = "top";
    ctx.fillText("点 击 液 体 表 面", 70, canvas.height / 2 - 20);
    ctx.fillStyle = "#fff";
    ctx.fillText("滑 动 滚 轮 改 变 液 体 粘 度", 70, canvas.height / 2 + 15);
    ctx.fillText("滚轮改变粘稠度 / Viscosity: " + ((dd - 15) * 20 / 7).toFixed(2) + "%", W / 2.5, canvas.height - 20);
    ctx.restore();
  }
  //顶点更新
  const update = function () {
    autoDiff -= autoDiff * 0.9;
    diffPt[vPos] = autoDiff;
    //左侧
    for (var i = vPos - 1; i > 0; i--) {
      var d = vPos - i;
      if (d > dd) {
        d = dd;
      }
      diffPt[i] -= (diffPt[i] - diffPt[i + 1]) * (1 - 0.01 * d);
    }
    //右侧
    for (var i = vPos + 1; i < verNum; i++) {
      var d = i - vPos;
      if (d > dd) {
        d = dd;
      }
      diffPt[i] -= (diffPt[i] - diffPt[i - 1]) * (1 - 0.01 * d);
    }
    //更新Y坐标
    for (var i = 0; i < vertexes.length; i++) {
      vertexes[i].updateY(diffPt[i]);
    }
  };
  (function drawframe() {
    if (!isRuning) {
      return
    }
    //更新坐标点
    ctx.clearRect(0, 0, W, H);
    window.requestAnimationFrame(drawframe, canvas);
    update()
    draw();
  })()
  return function () {
    isRuning = false
    window.removeEventListener('mousewheel', onMouseWheel);
    window.removeEventListener("resize", resize);
    console.log('disposing')
  }
}
export default function Collision() {
  const canvasEl = useRef(null)
  useEffect(() => run(canvasEl.current), [])
  var blue = function () {
    color1 = "#6ca0f6";
    color2 = "#367aec";
  }
  var black = function () {
    color1 = "#52D681";
    color2 = "#00AD7C";
  }
  var purple = function () {
    color1 = "#FF847C";
    color2 = "#E84A5F";
  }
  return (
    <div>
      <canvas ref={canvasEl} style={{ background: '#fff' }}></canvas>
      <div className="info">
        <h1>Liquaid</h1>
        <span className="blue" onClick={blue}></span>
        <span className="purple" onClick={purple}></span>
        <span className="black" onClick={black}></span>
      </div>
      <style jsx>{`
        *{  
          margin:0;
          padding:0;
          box-sizing: border-box;
        }
        body{
          overflow: hidden;
        }
        .info{
          position: absolute;
          top: 10%;
          left: 45%;
          color: #777;
        }
        .info h1{
          margin-left: -40px;
          margin-bottom: 10px;
          letter-spacing: 10px;
          font-weight: lighter;
          font-size: 35px;
          font-family: "Microsoft Yahei";
          -webkit-user-select:none;
        }
        span{
          height:10px;
          width:25px;
          display:inline-block;
          cursor:pointer;  
          transition: height 0.2s;
        }
        span:hover{
          height:15px;
        }
        .blue{
          background-color:#367aec;
          left:30px;
        }
        .purple{
          background-color:#E84A5F;
          left:50px;
        }
        .black{
          background-color:#52D681;
          left:70px;
        }
      `}</style>
    </div>
  )
}
