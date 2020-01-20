import Link from 'next/link'
const currentPath = '/canvas/billiard/'
const links = [
  'billiard',
  'billiard-multi-angle',
  'billiard-multi-angle-1',
  'billiard-opt',
  'bolliard-final',
  'bolliard-multi',
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
