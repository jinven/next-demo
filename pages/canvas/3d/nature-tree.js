import { useRef, useEffect } from 'react'
import { NatureTree } from '../../../utils/canvas/nature-tree'
function run(canvas, LeavesCtrl, spreadCtrl, leaveTypeCtrl) {
  var ctx = canvas.getContext('2d');
  var LeaveCtrlValue, spreadValue, leaveTypeValue;
  var W = canvas.width, H = canvas.height;
  var tree = new NatureTree(ctx);
  tree.x = W / 2;
  tree.y = H;
  tree.draw(0.6, true, tree.medium_leaves);
  //重绘
  function repaint() {
    ctx.clearRect(0, 0, W, H);
    tree.draw(spreadValue, LeaveCtrlValue, leaveTypeValue);
  }
  //事件绑定
  function option(obj) {
    obj.addEventListener('change', function () {
      if (obj == LeavesCtrl) {
        LeaveCtrlValue = obj.checked;
        if (!LeaveCtrlValue) {
          repaint();
        } else {
          repaint();
        }
      }
      if (obj == spreadCtrl) {
        spreadValue = obj.value;
        repaint();
      }
      if (obj == leaveTypeCtrl) {
        leaveTypeValue = obj.value;
        repaint();
      }
    });
  }
  option(LeavesCtrl);
  option(spreadCtrl);
  option(leaveTypeCtrl);
  return function () {
    console.log('disposing')
  }
}
export default function MultipleBouncing() {
  const canvasEl = useRef(null)
  const hasLeavesEl = useRef(null)
  const spreadEl = useRef(null)
  const leaveTypeEl = useRef(null)
  useEffect(() => run(canvasEl.current, hasLeavesEl.current, spreadEl.current, leaveTypeEl.current), [])
  return (
    <div>
      <canvas ref={canvasEl} width="800" height="500" style={{ background: '#ccc' }}></canvas>
      <div className="panel">
        <p>
          <label>leaves:</label>
          <input type="checkbox" ref={hasLeavesEl} onChange={(ev)=>{console.log(ev.target.checked)}} name="hasLeaves" className="element checkbox" />
        </p>
        <p>
          <label>spread:</label>
          <select ref={spreadEl} name="spread" defaultValue="0.6">
            <option value="0.3">0.3</option>
            <option value="0.4">0.4</option>
            <option value="0.5">0.5</option>
            <option value="0.6">0.6</option>
            <option value="0.7">0.7</option>
            <option value="0.8">0.8</option>
            <option value="0.9">0.9</option>
          </select>
        </p>
        <p>
          <label>leaveType:</label>
          <select ref={leaveTypeEl} name="leaveType" defaultValue="200">
            <option value="10">Small</option>
            <option value="200">Medium</option>
            <option value="500">Big</option>
            <option value="900">Thin</option>
          </select>
        </p>
      </div>
      <style jsx>{`
        canvas{
          margin: 0;
          padding: 0;
        }
        .panel{
          position: absolute;
          top: 0;
          left: 0;
          width: 200px;
          padding: 20px;
          border-right: 1px solid #777;
          border-bottom: 1px solid #777;
          margin-right: 300px;
        }
      `}</style>
    </div>
  )
}
