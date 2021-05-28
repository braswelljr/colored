import '../styles/index.css'
import Head from 'next/head'
import useStore from '../store'
import clsx from 'clsx'

const App = ({ Component, pageProps }) => {
  const theme = useStore(state => state.theme)
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>colored</title>

        <link rel="manifest" href="/manifest.json" />
        <link href="/icons/log192.png" rel="icon" type="image/png" />
        <link href="/icons/logo512.png" rel="icon" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <main className={clsx('min-h-[calc(100vh)]', { 'bg-gray-900': theme !== 'light' })}>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default App
