import Link from 'next/link'
function Canvas() {
  return (
    <div>
      <ol>
        <li><Link href="/canvas/velocity-3d"><a>小圆</a></Link></li>
        <li><Link href="/canvas/perspective"><a>小圆-鼠标移动</a></Link></li>
        <li><Link href="/canvas/spring"><a>小圆-抖动</a></Link></li>
        <li><Link href="/canvas/bouncing-3d"><a>3d小球-单个</a></Link></li>
        <li><Link href="/canvas/collision"><a>3d小球-多个</a></Link></li>
        <li><Link href="/canvas/easing"><a>3d小球-拖影</a></Link></li>
        <li><Link href="/canvas/gravity"><a>3d小球-重力感应</a></Link></li>
        <li><Link href="/canvas/multiple-bouncing"><a>3d小球-多个颜色</a></Link></li>
        <li><Link href="/canvas/z-sort"><a>3d小球-随机</a></Link></li>
        <li><Link href="/canvas/rotate"><a>3d小球-旋转</a></Link></li>
        <li><Link href="/canvas/rotate-xy"><a>3d小球-XY轴</a></Link></li>
        <li><Link href="/canvas/star"><a>3d小球-星</a></Link></li>
        <li><Link href="/canvas/nature-tree"><a>树</a></Link></li>
        <li><Link href="/canvas/tree1"><a>树1</a></Link></li>
        <li><Link href="/canvas/tree2"><a>树2</a></Link></li>
        <li><Link href="/canvas/lines-3d-1"><a>3d线条</a></Link></li>
      </ol>
    </div>
  )
}
Canvas.getInitialProps = async () => {
  return {}
}
export default Canvas
