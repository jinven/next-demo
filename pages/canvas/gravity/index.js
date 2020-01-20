import Link from 'next/link'
const currentPath = '/canvas/gravity/'
const links = [
  'gravity',
  'gravity-bounce',
  'node-garden',
  'node-garden-line',
  'node-garden-mass',
  'orbit',
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
