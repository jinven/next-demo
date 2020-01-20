import { useRef, useEffect } from 'react'
import Head from 'next/head'
import utils from '../../../utils/canvas/utils'
import { Rule } from '../../../utils/canvas/rule2'
function run(canvas, inputEl) {
  let isRuning = true
  var ctx = canvas.getContext('2d'),
    cW = canvas.width,
    cH = canvas.height,
    centerX = cW / 2,
    centerY = cH / 2;
  var ruleX = centerX, ruleY = 80;
  var isMouseDown = false, oldX = 0, offsetX = 0;
  var mouse = utils.captureMouse(canvas);
  var rule = new Rule({
    x: ruleX,
    y: ruleY,
    min: 500,
    max: 10000,
    width: 500,
    color: "#fff",
    step: 1000,
    markShort: 5,
    markLong: 12,
    textHeight: 5,
    lineBottom: {
      mx: 0,
      my: ruleY,
      lx: cW,
      ly: ruleY,
      color: '#fff'
    },
    lineRed: {
      mx: centerX,
      my: 40,
      lx: centerX,
      ly: (ruleY + 6),
      color: 'red'
    },
  });
  //重置标尺的初始位置
  rule.x = centerX - rule.min / rule.ratioScale;
  var oP = $(inputEl);
  //钱数
  var money = oP.val(rule.min);
  //起点
  var start = rule.x;
  //终点
  var end = rule.width;
  var speed = 0, fl = 0.95;
  oP.blur(function (e) {
    money = +this.value;
    if (rule.min <= money && money <= rule.max) {
      oP.val(money);
      rule.x = centerX - money / rule.ratioScale;
    } else {
      checkBountry();
      oP.val(money);
    }
  })
  canvas.addEventListener('mousedown', function (e) {
    isMouseDown = true;
    offsetX = mouse.x - rule.x;
    oldX = rule.x;
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
  })
  function onMouseUp(event) {
    isMouseDown = false;
    canvas.removeEventListener('mouseup', onMouseUp, false);
    canvas.removeEventListener('mousemove', onMouseMove, false);
  }
  function onMouseMove(event) {
    rule.x = mouse.x - offsetX;
    money = Math.floor((centerX - rule.x) * rule.ratioScale);
    //设置速度
    speed = rule.x - oldX;
    oldX = rule.x;
    checkBountry();
    oP.val(money);
  }
  //检测边界值
  function checkBountry() {
    if (money <= rule.min) {
      rule.x = start;
      money = rule.min;
    }
    if (money >= rule.max) {
      rule.x = centerX - end;
      money = rule.max;
    }
  }
  function move() {
    if (!isMouseDown && speed !== 0) {
      if (speed >= 1 || speed <= -1) {
        rule.x += speed;
        speed *= fl;
        money = Math.floor((centerX - rule.x) * rule.ratioScale);
        checkBountry()
        oP.val(money);
      }
    }
  }
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    move();
    rule.draw(ctx);
  })()
  return function () {
    isRuning = false
    console.log('disposing')
  }
}
export default function Collision() {
  const canvasEl = useRef(null)
  const inputEl = useRef(null)
  useEffect(() => run(canvasEl.current, inputEl.current), [])
  return (
    <div>
      <Head>
        <script type="text/javascript" src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
      </Head>
      <input ref={inputEl} type="number" style={{position: 'absolute'}} />
      <canvas ref={canvasEl} width="375" height="105" style={{ background: '#000' }}></canvas>
    </div>
  )
}
