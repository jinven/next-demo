import Link from 'next/link'
const currentPath = '/canvas/speed/'
const links = [
  'acceleration',
  'acceleration-2',
  'angular-acceleration',
  'angular-velocity',
  'gravity-as-accerlation',
  'mouse-floow',
  'spaceship',
  'velocity-axis',
  'velocity-extend',
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
