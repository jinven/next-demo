import Link from 'next/link'
function Canvas() {
  return (
    <div>
      <ol>
        <li><Link href="/canvas/3d"><a>3d</a></Link></li>
        <li><Link href="/canvas/boundary"><a>边界与摩擦力</a></Link></li>
        <li><Link href="/canvas/easing"><a>缓动与弹性动画</a></Link></li>
        <li><Link href="/canvas/impact"><a>碰撞检测</a></Link></li>
        <li><Link href="/canvas/tri"><a>三角函数与动画</a></Link></li>
        <li><Link href="/canvas/speed"><a>速度与加速度</a></Link></li>
        <li><Link href="/canvas/gravity"><a>万有引力</a></Link></li>
        <li><Link href="/canvas/moving"><a>移动物体</a></Link></li>
        <li><Link href="/canvas/billiard"><a>桌球运动</a></Link></li>
        <li><Link href="/canvas/coordinate"><a>坐标旋转与角度反弹</a></Link></li>
        <li><Link href="/canvas/other"><a>其他</a></Link></li>
      </ol>
    </div>
  )
}
Canvas.getInitialProps = async () => {
  return {}
}
export default Canvas
