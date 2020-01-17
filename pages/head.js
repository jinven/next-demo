import Head from 'next/head'

function IndexPage() {
  return (
    <div>
      <Head>
        <title>head标题设置</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      </Head>
      <Head>
        <meta name="viewport" content="initial-scale=1.2, width=device-width" key="viewport" />
      </Head>
      <p>head设置</p>
    </div>
  )
}

export default IndexPage