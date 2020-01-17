import fetch from 'isomorphic-unfetch'

function Page({ starts, tickerStart }) {
  const nowTickerStart = new Date().getTime()
  return (
    <div>
      <h2>后端取得Next在Github的星数</h2>
      <div>请求API： <a href="https://api.github.com/repos/zeit/next.js" target="_blank">https://api.github.com/repos/zeit/next.js</a></div>
      <div style={{margin: '10px 0'}}><a href="https://github.com/zeit/next.js" target="_blank">Next starts</a>: {starts}</div>
      <p>开始时间：{tickerStart}</p>
      <p>渲染时间：{nowTickerStart}</p>
      <p>耗时：{(nowTickerStart - tickerStart)/1000} 秒</p>
    </div>
  )
}
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

Page.getInitialProps = async ({ req }) => {
  let tickerStart = new Date().getTime()
  await sleep(5000)
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  return { starts: json.stargazers_count, tickerStart: tickerStart || 0 }
}

export default Page