import Link from 'next/link'
const currentPath = '/canvas/easing/'
function Canvas() {
  return (
    <div>
      <ol>
        <li><Link href={currentPath + "chain"}><a>chain</a></Link></li>
        <li><Link href={currentPath + "double-spring"}><a>double-spring</a></Link></li>
        <li><Link href={currentPath + "easing-1"}><a>easing-1</a></Link></li>
        <li><Link href={currentPath + "easing-2"}><a>easing-2</a></Link></li>
        <li><Link href={currentPath + "easing-off"}><a>easing-off</a></Link></li>
        <li><Link href={currentPath + "easing-to-mouse"}><a>easing-to-mouse</a></Link></li>
        <li><Link href={currentPath + "multi-spring"}><a>multi-spring</a></Link></li>
        <li><Link href={currentPath + "offset-spring"}><a>offset-spring</a></Link></li>
        <li><Link href={currentPath + "spring-1"}><a>spring-1</a></Link></li>
        <li><Link href={currentPath + "spring-2"}><a>spring-2</a></Link></li>
        <li><Link href={currentPath + "spring-3"}><a>spring-3</a></Link></li>
        <li><Link href={currentPath + "spring-line"}><a>spring-line</a></Link></li>
        <li><Link href={currentPath + "tri-spring"}><a>tri-spring</a></Link></li>
      </ol>
    </div>
  )
}
Canvas.getInitialProps = async () => {
  return {}
}
export default Canvas
