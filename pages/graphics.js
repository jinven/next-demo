import { useRef, useEffect, useState } from 'react'

const graphics = [
  { id: 1, value: '科赫曲线' },
  { id: 2, value: '谢尔宾斯基三角形' },
  { id: 3, value: '朱利亚集' },
  { id: 4, value: '曼德勃罗集合' },
  { id: 5, value: '布朗树' },
  { id: 6, value: '勾股树(毕达哥拉斯树)' },
]
const sides = Array(7).fill(0).map(({ }, j) => { return { id: j, value: j.toString() } }).slice(1)
const units = Array(6).fill(0).map(({ }, j) => { return { id: j * 10, value: (j * 10).toString() } }).slice(1)

// 科赫雪花
function fooKohn(eleCanvas, intMany, intUnit, intCanvasWidth, intCanvasHeight) {
  var objContext = eleCanvas.getContext('2d')
  var floSin60 = Math.sqrt(3) / 2;
  var intLength = Math.pow(3, intMany - 1) * intUnit / 2;
  var intX = intCanvasWidth / 2 - intLength;
  var intY = intCanvasHeight / 2 - (intLength * 2 * floSin60 - intUnit * floSin60) / 2;
  var intYCalc = 0;
  var eleKohnCanvas = document.createElement('canvas');
  eleKohnCanvas.width = intCanvasWidth;
  eleKohnCanvas.height = intCanvasHeight;
  var objKohnContext = eleKohnCanvas.getContext('2d');
  // objKohnContext.lineWidth=10;
  // objKohnContext.strokeStyle='#ff0000';
  objKohnContext.moveTo(0, 0);
  if (intMany == 2) {
    objKohnContext.lineTo(intUnit, 0);
    intYCalc = intUnit * floSin60;
  } else if (intMany == 3) {
    objKohnContext.lineTo(intUnit, 0);
    objKohnContext.lineTo(intUnit + intUnit / 2, intUnit * floSin60);
    objKohnContext.lineTo(intUnit * 2, 0);
    objKohnContext.lineTo(intUnit * 3, 0);
    objKohnContext.lineTo(intUnit * 3 + intUnit / 2, 0);
  }
  objKohnContext.lineTo(intLength, intYCalc);
  objKohnContext.stroke();

  objContext.drawImage(eleKohnCanvas, intX, 0, intCanvasWidth, intCanvasHeight);
  objContext.save();
  objContext.scale(-1, 1);
  objContext.drawImage(eleKohnCanvas, -intX - 2 * intLength, 0, intCanvasWidth, intCanvasHeight);
  objContext.restore();
  objKohnContext.clearRect(0, 0, intCanvasWidth, intCanvasHeight);
  objKohnContext.drawImage(eleCanvas, 0, 0, intCanvasWidth, intCanvasHeight);
  objContext.clearRect(0, 0, intCanvasWidth, intCanvasHeight);
  objContext.save();
  objContext.translate(intCanvasWidth / 2, intY);
  objContext.rotate(180 * Math.PI / 180);
  objContext.drawImage(eleKohnCanvas, -intCanvasWidth / 2, 0, intCanvasWidth, intCanvasHeight);
  objContext.restore();
  objContext.save();
  objContext.translate(intCanvasWidth / 2 - intLength / 2, intLength * floSin60 + intY);
  objContext.rotate(60 * Math.PI / 180);
  objContext.drawImage(eleKohnCanvas, -intCanvasWidth / 2, 0, intCanvasWidth, intCanvasHeight);
  objContext.restore();
  objKohnContext.drawImage(eleKohnCanvas, 0, 0, intCanvasWidth, intCanvasHeight);
  objContext.save();
  objContext.translate(intCanvasWidth / 2 + intLength / 2, intLength * floSin60 + intY);
  objContext.rotate(300 * Math.PI / 180);
  objContext.drawImage(eleKohnCanvas, -intCanvasWidth / 2, 0, intCanvasWidth, intCanvasHeight);
  objContext.restore();
};
function About() {
  const [shape, setShape] = useState(graphics[0].id)
  const [side, setSide] = useState(sides[0].id)
  const [unit, setUnit] = useState(units[0].id)
  const canvasEl = useRef(null)
  useEffect(function () {
    fooKohn(canvasEl.current, side, unit, 600, 600)
  }, [side, unit])
  console.log('shape', shape, typeof shape, graphics.find(a => a.id === shape)?.value)
  console.log('side', side, typeof side, sides.find(a => a.id === side)?.value)
  console.log('unit', unit, typeof unit, units.find(a => a.id === unit)?.value)
  return (
    <div>
      <div style={{ marginTop: 10 }}>
        <select onChange={(ev) => setShape(parseInt(ev.target.value, 10))}>{graphics.map(element =>
          <option value={element.id} key={element.id}>{element.value}</option>
        )}</select>
        <span>阶数</span>
        <select onChange={(ev) => setSide(parseInt(ev.target.value, 10))}>{sides.map(item => <option value={item.id} key={item.id}>{item.value}</option>)}</select>
        <span>单位</span>
        <select onChange={(ev) => setUnit(parseInt(ev.target.value, 10))}>{units.map((item) => <option value={item.id} key={item.id}>{item.value}</option>)}</select>
      </div>
      <div>
        <canvas ref={canvasEl} width="600" height="600"></canvas>
      </div>
      <style jsx>{`
        select {
          height: 25px;
          line-height: 25px;
          border: 1px solid #999;
          border-radius: 3px;
          margin: 0 20px 0 3px;
          vertical-align: middle;
        }
        canvas {
          margin: 10px;
          border: 1px dashed #eee;
        }
      `}</style>
    </div>
  )
}
About.getInitialProps = async () => {
  return {}
}
export default About