import Link from 'next/link'
const currentPath = '/canvas/tri/'
function Canvas() {
  return (
    <div>
      <ol>
        <li><Link href={currentPath + "circles-and-ellipses"}><a>circles-and-ellipses</a></Link></li>
        <li><Link href={currentPath + "circular-movement"}><a>circular-movement</a></Link></li>
        <li><Link href={currentPath + "distance-between-two-points"}><a>distance-between-two-points</a></Link></li>
        <li><Link href={currentPath + "linear-vertical-motion"}><a>linear-vertical-motion</a></Link></li>
        <li><Link href={currentPath + "mouse-distance"}><a>mouse-distance</a></Link></li>
        <li><Link href={currentPath + "plusing-motion"}><a>plusing-motion</a></Link></li>
        <li><Link href={currentPath + "rotate-to-mouse"}><a>rotate-to-mouse</a></Link></li>
        <li><Link href={currentPath + "smooth-circle-motion"}><a>smooth-circle-motion</a></Link></li>
        <li><Link href={currentPath + "waves-with-drawing-api"}><a>waves-with-drawing-api</a></Link></li>
        <li><Link href={currentPath + "wave-with-two-angles"}><a>wave-with-two-angles</a></Link></li>
      </ol>
    </div>
  )
}
Canvas.getInitialProps = async () => {
  return {}
}
export default Canvas
