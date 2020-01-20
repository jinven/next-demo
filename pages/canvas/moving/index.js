import Link from 'next/link'
const currentPath = '/canvas/moving/'
const links = [
  'mouse-event',
  'rule',
  'throwing',
  'touch-event',
  'drag-1',
  'drag-2',
]
export default function() {
  return (
    <div>
      <ol>
        {
          links.map((item, index) => <li key={index}><Link href={currentPath + item}><a>{item}</a></Link></li>)
        }
      </ol>
    </div>
  )
}
