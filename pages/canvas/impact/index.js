import Link from 'next/link'
const currentPath = '/canvas/impact/'
function Canvas() {
  return (
    <div>
      <ol>
        <li><Link href={currentPath + "boxes"}><a>boxes</a></Link></li>
        <li><Link href={currentPath + "distance-1"}><a>distance-1</a></Link></li>
        <li><Link href={currentPath + "distance-2"}><a>distance-2</a></Link></li>
        <li><Link href={currentPath + "multi-object-hit"}><a>multi-object-hit</a></Link></li>
        <li><Link href={currentPath + "object-hit-test"}><a>object-hit-test</a></Link></li>
        <li><Link href={currentPath + "point-hit-test"}><a>point-hit-test</a></Link></li>
        <li><Link href={currentPath + "spring-collision-1"}><a>spring-collision-1</a></Link></li>
        <li><Link href={currentPath + "spring-collision-2"}><a>spring-collision-2</a></Link></li>
      </ol>
    </div>
  )
}
Canvas.getInitialProps = async () => {
  return {}
}
export default Canvas
