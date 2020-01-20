import { useRef, useEffect } from 'react'
import { Analyser } from '../../../utils/canvas/analyser'
import { LineCircle } from '../../../utils/canvas/linecircle'
function setCanvas(canvas, ctx, dpr, obj, bgColor) {
  var size = dpr || 1;
  canvas.width = (obj.w || 300) * dpr;
  canvas.height = (obj.h || 150) * dpr;
  canvas.style.width = (obj.w || 300)+ 'px';
  canvas.style.height = (obj.h || 150) + 'px';
  canvas.style.background = bgColor || '#000';
  ctx.scale(size, size);
}
function run(canvas, audioInput) {
  let isRuning = true
  var analyserSource = new Analyser(audioInput, 256);
  var audioLen = analyserSource.getAudioLength();
  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 1;
  var obj = { w: 300, h: 500 };
  var options = {
    x: 150,
    y: 250,
    radius: 100,
    initAngle: 0,
    color: "rgba(255,255,255,0.8)",
    data: Array(audioLen).fill(0.5)
  }
  var options2 = {
    x: 150,
    y: 250,
    radius: 80,
    initAngle: 20,
    color: "#f87d42",
    data: Array(audioLen).fill(0.5)
  }
  setCanvas(canvas, ctx, dpr, obj, '#000');
  drawCircle(options);
  function drawCircle(opt) {
    var LC = new LineCircle(opt);
    LC.draw(ctx);
  }
  var timer = setInterval(drawFrame, 90);
  function drawFrame() {
    var audioData = analyserSource.getTimeData();
    if (audioData.length > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var newData = audioData.map(item => {
        if (item > 128) {
          item = item - 128;
        } else {
          item = 128 - item
        }
        return item = item / 2
      });
      options.data = newData;
      options2.data = newData;
      var LC = new LineCircle(options);
      var LC_2 = new LineCircle(options2);
      LC.draw(ctx);
      LC_2.draw(ctx);
    }
  }
  return function () {
    isRuning = false
    window.clearInterval(timer)
    console.log('disposing')
  }
}
export default function Collision() {
  const canvasEl = useRef(null)
  const audioEl = useRef(null)
  useEffect(() => run(canvasEl.current, audioEl.current), [])
  return (
    <div>
      <input type="file" ref={audioEl} />
      <canvas ref={canvasEl}></canvas>
    </div>
  )
}
