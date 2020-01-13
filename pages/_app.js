import React from 'react'
import App from 'next/app'
import Link from 'next/link'
import NProgress from 'nprogress'
import Router from 'next/router'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

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

let isHome = false;
export default class MyApp extends App {
  static async getInitialProps(appContext) {
    // 服务端调用
    isHome = ['','/','/index','/index/'].indexOf((appContext.router.pathname || '').toLocaleLowerCase())>=0
    console.log('_app.js - getInitialProps', appContext.router.pathname, isHome);
    const appProps = await App.getInitialProps(appContext);
    return {...appProps}
  }
  constructor(props){
    super(props)
    this.state = {
      isHome: false
    }
  }
  componentDidCatch(error, errorInfo) {
    console.log('CUSTOM ERROR HANDLING', error)
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo)
  }
  componentDidMount() {
    // 此方法只在客户端调用
    isHome = ['','/','/index','/index/'].indexOf((window.location.pathname || '').toLocaleLowerCase())>=0
    console.log('_app.js componentDidMount', isHome)
    this.setState({isHome: isHome})
  }
  render() {
    const { Component, pageProps } = this.props
    isHome = this.state.isHome
    console.log('_app.js - render', isHome)
    return (
      <ThemeProvider theme={theme}>
        <Head>
          {/* Import CSS for nprogress */}
          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        </Head>
        <nav>
          <style jsx>{`
            a {
              margin: 0 10px 0 0;
            }
          `}</style>
          <Link href="/">
            <a>主页</a>
          </Link>
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
