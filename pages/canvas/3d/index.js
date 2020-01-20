import Link from 'next/link'
const currentPath = '/canvas/3d/'
function Canvas() {
  return (
    <div>
      <ol>
        <li><Link href={currentPath + "velocity-3d"}><a>小圆</a></Link></li>
        <li><Link href={currentPath + "perspective"}><a>小圆-鼠标移动</a></Link></li>
        <li><Link href={currentPath + "spring"}><a>小圆-抖动</a></Link></li>
        <li><Link href={currentPath + "bouncing-3d"}><a>3d小球-单个</a></Link></li>
        <li><Link href={currentPath + "collision"}><a>3d小球-多个</a></Link></li>
        <li><Link href={currentPath + "easing"}><a>3d小球-拖影</a></Link></li>
        <li><Link href={currentPath + "gravity"}><a>3d小球-重力感应</a></Link></li>
        <li><Link href={currentPath + "multiple-bouncing"}><a>3d小球-多个颜色</a></Link></li>
        <li><Link href={currentPath + "z-sort"}><a>3d小球-随机</a></Link></li>
        <li><Link href={currentPath + "rotate"}><a>3d小球-旋转</a></Link></li>
        <li><Link href={currentPath + "rotate-xy"}><a>3d小球-XY轴</a></Link></li>
        <li><Link href={currentPath + "star"}><a>3d小球-星</a></Link></li>
        <li><Link href={currentPath + "nature-tree"}><a>树</a></Link></li>
        <li><Link href={currentPath + "tree1"}><a>树1</a></Link></li>
        <li><Link href={currentPath + "tree2"}><a>树2</a></Link></li>
        <li><Link href={currentPath + "lines-3d-1"}><a>3d线条1</a></Link></li>
        <li><Link href={currentPath + "lines-3d-2"}><a>3d线条2</a></Link></li>
      </ol>
    </div>
  )
}
Canvas.getInitialProps = async () => {
  return {}
}
export default Canvas
