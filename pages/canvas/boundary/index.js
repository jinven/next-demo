import Link from 'next/link'
const currentPath = '/canvas/boundary/'
function Canvas() {
  return (
    <div>
      <ol>
        <li><Link href={currentPath + "bouncing1"}><a>bouncing1</a></Link></li>
        <li><Link href={currentPath + "bouncing2"}><a>bouncing1</a></Link></li>
        <li><Link href={currentPath + "boundaries-remove"}><a>boundaries_remove</a></Link></li>
        <li><Link href={currentPath + "friction1"}><a>friction(摩擦力)_1</a></Link></li>
        <li><Link href={currentPath + "friction2"}><a>friction(摩擦力)_2</a></Link></li>
        <li><Link href={currentPath + "refenerating-object"}><a>refenerating-object</a></Link></li>
        <li><Link href={currentPath + "ship-friction"}><a>ship-friction</a></Link></li>
      </ol>
    </div>
  )
}
Canvas.getInitialProps = async () => {
  return {}
}
export default Canvas
