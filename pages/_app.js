import React, { useEffect } from 'react'
import App from 'next/app'
import Link from 'next/link'
import NProgress from 'nprogress'
import Router from 'next/router'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import NavService from '../services/nav.service'

const theme = {
  colors: {
    primary: '#0070f3',
  },
}
Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', (err, url) => {
  console.log('routeChangeError: ' + url, err)
  NProgress.done()
})
// Router.beforePopState(({ user, as, options }) => {
//     console.log('beforePopState')
//     if(as !== '/' && as !== '/other'){
//         window.location.href = as
//         return false
//     }
//     return true
// })

let isHome = false
let isCanvas = false
export default class MyApp extends App {
  static async getInitialProps(appContext) {
    // 服务端调用
    isHome = ['', '/', '/index', '/index/'].indexOf((appContext.router.pathname || '').toLocaleLowerCase()) >= 0
    isCanvas = (appContext.router.pathname || '').indexOf('/canvas/') >= 0
    console.log('_app.js - getInitialProps', appContext.router.pathname, isHome);
    const appProps = await App.getInitialProps(appContext);
    return { ...appProps }
  }
  constructor(props) {
    super(props)
    this.state = {
      isCanvas: false,
      isHome: false,
      isClient: false
    }
  }
  componentDidCatch(error, errorInfo) {
    console.log('CUSTOM ERROR HANDLING', error)
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo)
  }
  componentDidMount() {
    // 此方法只在客户端调用
    isHome = ['', '/', '/index', '/index/'].indexOf((window.location.pathname || '').toLocaleLowerCase()) >= 0
    isCanvas = (window.location.pathname || '').indexOf('/canvas/') >= 0
    console.log('_app.js componentDidMount', isHome)
    this.setState({
      isCanvas: isCanvas,
      isHome: isHome,
      isClient: true
    })
  }
  componentDidUpdate() {
    console.log('_app.js - componentDidUpdate')
  }
  componentWillUpdate() {
    console.log('_app.js - componentWillUpdate')
  }
  render() {
    const { Component, pageProps } = this.props
    let canvasSecond
    if (this.state.isClient) {
      let pathname = (window.location.pathname || '').toLocaleLowerCase()
      isHome = ['', '/', '/index', '/index/'].indexOf(pathname.toLocaleLowerCase()) >= 0
      isCanvas = pathname.indexOf('/canvas/') >= 0
      if (isCanvas) {
        canvasSecond = NavService.canvasSecond(pathname)
        // if (pathname.indexOf('/canvas/3d/') >= 0) {
        //   SecondLink = <Link href="/canvas/3d"><a>3d</a></Link>
        // } else if (pathname.indexOf('/canvas/boundary/') >= 0) {
        //   SecondLink = <Link href="/canvas/boundary"><a>边界与摩擦力</a></Link>
        // } else if (pathname.indexOf('/canvas/easing/') >= 0) {
        //   SecondLink = <Link href="/canvas/easing"><a>缓动与弹性动画</a></Link>
        // } else if (pathname.indexOf('/canvas/impact/') >= 0) {
        //   SecondLink = <Link href="/canvas/impact"><a>碰撞检测</a></Link>
        // } else if (pathname.indexOf('/canvas/tri/') >= 0) {
        //   SecondLink = <Link href="/canvas/tri"><a>三角函数与动画</a></Link>
        // } else if (pathname.indexOf('/canvas/speed/') >= 0) {
        //   SecondLink = <Link href="/canvas/speed"><a>速度与加速度</a></Link>
        // } else if (pathname.indexOf('/canvas/gravity/') >= 0) {
        //   SecondLink = <Link href="/canvas/gravity"><a>万有引力</a></Link>
        // } else if (pathname.indexOf('/canvas/moving/') >= 0) {
        //   SecondLink = <Link href="/canvas/moving"><a>移动物体</a></Link>
        // } else if (pathname.indexOf('/canvas/snooker/') >= 0) {
        //   SecondLink = <Link href="/canvas/snooker"><a>桌球运动</a></Link>
        // } else if (pathname.indexOf('/canvas/coordinate/') >= 0) {
        //   SecondLink = <Link href="/canvas/coordinate"><a>坐标旋转与角度反弹</a></Link>
        // } else if (pathname.indexOf('/canvas/other/') >= 0) {
        //   SecondLink = <Link href="/canvas/other"><a>其他</a></Link>
        // }
      }
    } else {
      isHome = this.state.isHome
      isCanvas = this.state.isCanvas
    }
    console.log('_app.js - render', isHome)
    return (
      <ThemeProvider theme={theme}>
        <Head>
          {/* Import CSS for nprogress */}
          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        </Head>
        <nav style={{ position: 'relative', zIndex: 99999, userSelect: 'none' }}>
          <style global jsx>{`
            body {
              margin: 0;
            }
          `}</style>
          <style jsx>{`
            :global(body) {
              background-color: #bbb;
            }
            nav {
              background-color: #333;
              height: 30px;
              line-height: 30px;
              font-size: 15px;
              padding: 0 10px;
              box-shadow: rgba(0,0,0,1) 0 0 5px 0;
            }
            nav a {
              margin: 0 10px 0 0;
              padding: 0 8px;
              display: inline-block;
              color: #eee;
              text-decoration: none;
              min-width: 60px;
              text-align: center;
            }
            nav a:hover {
              color: #999;
            }
          `}</style>
          <Link href="/">
            <a>主页</a>
          </Link>
          {
            isCanvas &&
            <>
              <Link href="/canvas"><a>Canvas动画</a></Link>
              {
                canvasSecond &&
                <Link href={canvasSecond.path}><a>{canvasSecond.name}</a></Link>
              }
            </>
          }
          {
            isHome &&
            <>
              <Link href="/about">
                <a>关于页面</a>
              </Link>
              <Link href="/forever">
                <a>Forever</a>
              </Link>
              <Link href="/non-existing">
                <a>不存在的页面</a>
              </Link>
            </>
          }
        </nav>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
