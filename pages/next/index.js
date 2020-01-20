import Router, { withRouter } from 'next/router'
import Link from 'next/link'
import LinkButton from '../../components/mybutton'
import { format } from 'url'

let counter = 1
const reload = () => {
  const { pathname, query } = Router
  Router.push(format({ pathname, query }))
}
const incrementStateCounter = (router) => {
  const currentCounter = router.query.counter ? parseInt(router.query.counter) : 0
  if (currentCounter === 10) {
    // throw new Error('I crashed!')
  }
  const href = `/next?counter=${currentCounter + 1}`
  Router.push(href, href, { shallow: true })
}
function Index({ initialPropsCounter, router }) {
  return (
    <div style={{ padding: '10px 0', textAlign: 'center' }}>
      <div className="shallow-routing">
        <button onClick={() => reload()}>重新加载</button>
        <button onClick={() => incrementStateCounter(router)}>改变计数器</button>
        <p><a href="https://nextjs.org/docs/api-reference/data-fetching/getInitialProps" target="_blank">getInitialProps</a> 执行了 {initialPropsCounter} 次</p>
        <p>计数器: {router.query.counter || 0}</p>
      </div>
      <img src="/my-image.png" alt="my image" style={{ borderRadius: '50%', boxShadow: 'rgb(127, 127, 127) 0 0 10px 0' }} />
      <div style={{ paddingTop: 20 }}>
        <ul>
          <li><Link href="/cowsayhi"><a>CowsayHi</a></Link></li>
          <li><Link href="/post"><a>post动态参数</a></Link></li>
          <li><Link href="/fetch"><a>后端fetch数据</a></Link></li>
          <li><LinkButton href="/helloua" /></li>
          <li><Link href="/cookies"><a>后端cookies</a></Link></li>
          <li><Link href="/blog"><a>传递参数</a></Link></li>
          <li><Link href="/dynamic"><a>动态页面</a></Link></li>
          <li><Link href="/scss"><a>scss</a></Link></li>
          <li><Link href="/babel"><a>babel</a></Link></li>
          <li><Link href="/customkey"><a>运行时信息</a></Link></li>
        </ul>
      </div>
      <style jsx>{`
        .shallow-routing{
          text-align: center;
        }
        ul{
          max-width: 500px;
          margin: 0 auto;
        }
        li{
          margin: 0 5px 5px 0;
          display: inline-block;
        }
        li a{
          display: inline-block;
          background-color: #6f6e6b;
          border-radius: 3px;
          padding: 5px 10px;
          text-decoration: none;
          color: #cbc6f7;
        }
        li a:hover{
          color:#f99;
          background-color:#777;
        }
        ul, li{
          list-style:none;
          padding: 0;
        }
      `}</style>
    </div>
  )
}
Index.getInitialProps = async ({ res }) => {
  counter++
  return {
    initialPropsCounter: counter,
    people: []
  }
}
export default withRouter(Index)