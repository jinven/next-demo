import { useRef, useEffect } from 'react'
function run(canvas, oRange, ranVau) {
  let isRuning = true
  var context = canvas.getContext('2d');
  context.lineWidth = 2;
  context.strokeStyle = "#ffffff";
  var angle = 0,
    range = 50,
    xspeed = 0.5,
    yspeed = 0.05,
    xpos = 0,
    ypos = canvas.height / 2;
  stdLine();
  drawFrame();
  oRange.addEventListener('change', function (event) {
    xpos = 0, ypos = canvas.height / 2;
    range = this.value;
    ranVau.value = this.value;
    context.clearRect(0, 0, canvas.width, canvas.height);
    stdLine();
    drawFrame();
  }, false);
  function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.beginPath();
    context.moveTo(xpos, ypos);
    //calculate new position
    xpos += xspeed;
    angle += yspeed;
    ypos = canvas.height / 2 + Math.sin(angle) * range;
    context.lineTo(xpos, ypos);
    context.stroke();
  };
  function stdLine() {
    context.save();
    context.beginPath();
    context.moveTo(xpos, ypos);
    context.lineTo(canvas.width, ypos);
    context.closePath();
    context.strokeStyle = "#479";
    context.stroke();
    context.restore();
  }
  return function () {
    isRuning = false
    console.log('disposing')
  }
}
export default function Collision() {
  const canvasEl = useRef(null)
  const rangeEl = useRef(null)
  const ranVauEl = useRef(null)
  useEffect(() => run(canvasEl.current, rangeEl.current, ranVauEl.current), [])
  return (
    <div>
      <canvas ref={canvasEl} width="500" height="500" style={{ background: '#000' }}></canvas>
      <div>
        <p>振幅:
          <input type="range" className="range" min="0" max="200" defaultValue="50" step="1" ref={rangeEl} />
          <input type="text" className="ranVau" defaultValue="50" ref={ranVauEl} />
        </p>
      </div>
      <style jsx>{`
        .range { 
          width: 300px; 
          height: 5px;
          background: rgba(0, 0, 0, .6); 
          border-radius: 5px; 
          -webkit-appearance: none !important; 
        } 
        .range::-webkit-slider-thumb{ 
          width: 15px; 
          height: 15px; 
          background: gradient(linear, left top, left bottom, from(#fff), to(#ccc)); 
          border: 1px solid #444; 
          box-shadow: 0 0 3px #000; 
          border-radius: 14px; 
          -webkit-appearance: none !important; 
        } 
        .ranVau { 
          text-align: center;
          border: 1px solid #ccc; 
          width: 32px; 
          margin-left:10px;
        } 
      `}</style>
    </div>
  )
}
