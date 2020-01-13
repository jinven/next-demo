import React from 'react'

const ForeverPage = () => <p>3秒后渲染此页</p>

ForeverPage.getInitialProps = async () => {
  await new Promise(resolve => {
    setTimeout(resolve, 3000)
  })
  return {}
}

export default ForeverPage
