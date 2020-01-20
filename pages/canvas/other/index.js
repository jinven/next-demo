import Link from 'next/link'
const currentPath = '/canvas/other/'
const links = [
  {id: 'liquild', name: '流体'},
  {id: 'wave', name: '水波'},
  {id: 'erase', name: '擦除'},
  {id: 'barrage', name: '弹幕'},
  {id: 'percentage-loading', name: '百分比加载'},
  {id: 'martrix', name: '黑客帝国'},
  {id: 'multicolored-ball', name: '五彩球'},
  {id: 'audio-parsing', name: '音频解析+环形音频可视化'},
  {id: 'price-drag', name: '价格拖动'},
  {id: 'shooting-games', name: '射击小游戏'},
]
export default function () {
  return (
    <div>
      <ol>
        {
          links.map((item, index) => <li key={index}><Link href={currentPath + item.id}><a>{item.name || item.id}</a></Link></li>)
        }
      </ol>
    </div>
  )
}
