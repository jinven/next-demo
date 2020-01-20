import React from 'react'
import Head from 'next/head'
import ReadMore from '../components/readmore'
import Link from 'next/link'
import { withRouter } from 'next/router'
import Person from '../components/Person'
import styled from 'styled-components'

const Title = styled.span`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`
const Home = ({ people }) => (
  <div>
    <Head>
      <title>主页</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {/* <Nav /> */}
    <div className="hero">
      <h1 className="title"><Title>欢迎!</Title></h1>
      <div style={{textAlign:'center'}}>
        <ul>
          {/* <li><Link href="/helloworld" replace><a>HelloWorld</a></Link></li> */}
          <li style={{height: 30, width: 30, verticalAlign: 'middle', padding: '0 10px'}}>
            <Link href="/next"><img src="favicon.ico" alt="image" style={{maxWidth: '100%', maxHeight: '100%', borderRadius: '50%', boxShadow: 'rgb(0,0,0) 0px 1px 6px 0', backgroundColor: '#8784a5'}} title="Next相关" /></Link>
          </li>
          {/* <li><a href="/users">users</a></li> */}
          {/* <li><Link href="/a"><a>/a</a></Link></li> */}
          {/* <li><Link href="/b"><a>/b</a></Link></li> */}
          {/* <li><Link scroll={false} href="/?counter=10"><a>不滚动</a></Link></li>
          <li><Link href="/?counter=10"><a>滚动到顶部</a></Link></li> */}
          {/* <li><Link href="/error"><a>error</a></Link></li> */}
          {/* <li><Link href="/faker"><a>faker</a></Link></li> */}
          <li><ReadMore /></li>
          {
            people.map((p, i) => (
              <Person key={i} person={p} />
            ))
          }
        </ul>
        <div>
          <h3>演示</h3>
          <ul>
            <li><Link href="/graphql"><a>graphql</a></Link></li>
            <li><Link href="/protobuf"><a>protobuf</a></Link></li>
            <li><Link href="/gif"><a>canvas2gif</a></Link></li>
            <li><Link href="/aslider"><a>滑块过渡</a></Link></li>
            <li><Link href="/graphics"><a>数学图形</a></Link></li>
            <li><Link href="/canvasround"><a>canvas圆角</a></Link></li>
            <li><Link href="/3d"><a>3d</a></Link></li>
            <li><Link href="/csscenter"><a>css居中</a></Link></li>
          </ul>
        </div>
        <div>
          <h3>收集</h3>
          <ul>
            <li><Link href="/cssimage"><a>css图形</a></Link></li>
            <li><Link href="/3dbutterfly"><a>3d蝴蝶</a></Link></li>
            <li><Link href="/canvas"><a>canvas动画</a></Link></li>
          </ul>
        </div>
      </div>
      {/* <div className="row">
          <a href="https://nextjs.org/docs" className="card">
              <h3>Documentation &rarr;</h3>
              <p>Learn more about Next.js in the documentation.</p>
          </a>
      </div> */}
    </div>
    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .hero img{
          cursor:pointer;
      }
      .title {
        width: 100%;
        line-height: 1.15;
        font-size: 48px;
      }
      .title {
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
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
    </div>
)
Home.getInitialProps = async ({ res }) => {
    console.log('index.js - getInitialProps')
    // const response = await fetch(CURRENT_URL + 'api/people')
    // console.log('index.js - response')
    // const people = await response.json()
    // console.log('index.js - people', people.length)
    // if(res){
    //     return { initialPropsCounter: 1, people: people || [] }
    // }
    return {
        people: []
    }
}
export default withRouter(Home)
