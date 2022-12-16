import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SideBar from '../components/SideBar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
