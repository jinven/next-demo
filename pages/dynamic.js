import React from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const DynamicComponent1 = dynamic(import('../components/hello1'))

const DynamicComponent2WithCustomLoading = dynamic({
  loader: () => import('../components/hello2'),
  loading: () => <p>Loading caused by client page transition ...</p>,
})

const DynamicComponent3WithNoSSR = dynamic({
  loader: () => import('../components/hello3'),
  loading: () => <p>Loading ...</p>,
  ssr: false,
})

const DynamicComponent4 = dynamic({
  loader: () => import('../components/hello4'),
})

const DynamicComponent5 = dynamic({
  loader: () => import('../components/hello5'),
})

const DynamicPage = ({ showMore }) => {
  const router = useRouter()
  const handleToggle = () => {
    if (showMore) {
      router.push('/dynamic')
      return
    }

    router.push('/dynamic?showMore=1')
  }

  return (
    <div>
      {/* Load immediately, but in a separate bundle */}
      <DynamicComponent1 />

      {/* Show a progress indicator while loading */}
      <DynamicComponent2WithCustomLoading />

      {/* Load only on the client side */}
      <DynamicComponent3WithNoSSR />

      {/* This component will never be loaded */}
      {React.noSuchField && <DynamicComponent4 />}

      {/* Load on demand */}
      {showMore && <DynamicComponent5 />}
      <button onClick={handleToggle}>切换显示更多</button>
    </div>
  )
}

DynamicPage.getInitialProps = ({ query }) => {
  return { showMore: Boolean(query.showMore) }
}

export default DynamicPage
