import Link from 'next/link'
const currentPath = '/canvas/coordinate/'
const links = [
  {id: 'multi-angle-rebound', name: '多角度反弹'},
  {id: 'multi-object-rotation', name: '多物体旋转'},
  {id: 'adv-coor-rotation', name: '高级坐标旋转'},
  {id: 'simple-coor-rotation', name: '简单的坐标旋转'},
  {id: 'angle-bounce', name: '角度反弹'},
  {id: 'mouse-rotation-line', name: '角度反弹-鼠标旋转线段'},
  {id: 'angle-bounce-mouse', name: '角度反弹-鼠标旋转线段-hit-text'},
  {id: 'angle-bounce-opt', name: '角度反弹优化'},
  {id: 'angle-bounce-final', name: '角度反弹最终版'},
]
export default function () {
  return (
    <div>
      <ol>
        {
          links.map((item, index) => <li key={index}><Link href={currentPath + item.id}><a>{item.name || item.id}</a></Link></li>)
        }
      </ol>
    </div>
  )
}
