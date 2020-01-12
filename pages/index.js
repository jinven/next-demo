import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import ReadMore from '../components/readmore'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import LinkButton from '../components/mybutton'
import { format } from 'url'
import Person from '../components/Person'
import fetch from 'isomorphic-unfetch'
import styled from 'styled-components'
import { CURRENT_URL } from '../utils/consts'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`
let counter = 1
const reload = () => {
    const { pathname, query } = Router
    Router.push(format({ pathname, query }))
}
const incrementStateCounter = (router) => {
    const currentCounter = router.query.counter ? parseInt(router.query.counter) : 0
    if(currentCounter===10){
      throw new Error('I crashed!')
    }
    const href = `/?counter=${currentCounter + 1}`
    Router.push(href, href, { shallow: true })
}
const Home = ({ initialPropsCounter, router, people }) => (
    <div>
        <Head>
            <title>Home</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav />
        <div className="hero">
            <h1 className="title"><Title>Welcome to Next.js!</Title></h1>
            <p className="description">
                To get started, edit <code>pages/index.js</code> and save to reload.
            </p>
            <div className="shallow-routing">
                <button onClick={()=>reload()}>Reload</button>
                <button onClick={()=>incrementStateCounter(router)}>Change State Counter</button>
                <p>"getInitialProps" ran for "{initialPropsCounter}" times.</p>
                <p>Counter: "{router.query.counter}".</p>
            </div>
            <div style={{textAlign:'center'}}>
                <ul>
                    <li><a href="/CowsayHi">CowsayHi</a></li>
                    <li><Link href="/HelloWorld" replace><a>HelloWorld</a></Link></li>
                    <li><Link href="/HiThere"><img src="favicon.ico" alt="image" /></Link></li>
                    <li><a href="/MyImage">MyImage</a></li>
                    <li><a href="/post/1">/post/1</a></li>
                    <li><Link href={{ pathname: '/post/2', query: { name: 'zeit' } }}><a>/post/2</a></Link></li>
                    <li><Link href="/post/[pid]" as="/post/abc"><a>First Post</a></Link></li>
                    <li><a href="/post/pid/comment">/post/pid/comment</a></li>
                    <li><a href="/head">/head</a></li>
                    <li><a href="/fetch">/fetch</a></li>
                    <li><a href="/posts">/posts</a></li>
                    <li><LinkButton href="/helloua" /></li>
                    <li><a href="/cookies">/cookies</a></li>
                    <li><a href="/graphql">/graphql</a></li>
                    <li><a href="/users">/users</a></li>
                    <li><Link href="/a"><a>/a</a></Link></li>
                    <li><Link href="/b"><a>/b</a></Link></li>
                    <li><Link href="/blog?id=first" as="/blog/first"><a>My first blog post</a></Link></li>
                    <li><Link href="/blog?id=second" as="/blog/second"><a>My second blog post</a></Link></li>
                    <li><Link href="/blog?id=last" as="/blog/last"><a>My last blog post</a></Link></li>
                    <li><Link scroll={false} href="/?counter=10"><a>Disables scrolling</a></Link></li>
                    <li><Link href="/?counter=10"><a>Changes with scrolling to top</a></Link></li>
                    <li><Link href="/dynamic"><a>/dynamic</a></Link></li>
                    <li><Link href="/error"><a>/error</a></Link></li>
                    <li><Link href="/faker"><a>/faker</a></Link></li>
                    <li><Link href="/scss"><a>/scss</a></Link></li>
                    <li><Link href="/babel"><a>/babel</a></Link></li>
                    <li><Link href="/customkey"><a>/customkey</a></Link></li>
                    <li><Link href="/protobuf"><a>/protobuf</a></Link></li>
                    <li><ReadMore /></li>
                    {
                      people.map((p, i) => (
                        <Person key={i} person={p} />
                      ))
                    }
                </ul>
            </div>
            <div className="row">
                <a href="https://nextjs.org/docs" className="card">
                    <h3>Documentation &rarr;</h3>
                    <p>Learn more about Next.js in the documentation.</p>
                </a>
            </div>
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
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .shallow-routing{
          text-align: center;
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
    counter++
    return {
        initialPropsCounter: counter,
        people: []
    }
}
export default withRouter(Home)
