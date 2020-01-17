import React from 'react'
import Link from 'next/link'

export default class extends React.Component {
  static getInitialProps({ query: { id } }) {
    return { id }
  }

  render() {
    return (
      <div>
        <h3>参数传递和获取</h3>
        <ul>
          <li><Link href="/blog?id=first" as="/blog/first"><a>/blog?id=first</a></Link></li>
          <li><Link href="/blog?id=second" as="/blog/second"><a>/blog?id=second</a></Link></li>
          <li><Link href="/blog?id=last" as="/blog/last"><a>/blog?id=last</a></Link></li>
        </ul>
        <p>我的 {this.props.id} 博客发布</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    )
  }
}
