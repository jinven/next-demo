import React from 'react'
import Link from 'next/link'

const MyButton = React.forwardRef(({ onClick, href }, ref) => (
  <a href={href} onClick={onClick} ref={ref} style={{textDecoration: 'none'}}>自定义组件</a>
))

export default ({ href }) => (
  <>
    <Link href={href}>
      <MyButton href={href} />
    </Link>
  </>
)
