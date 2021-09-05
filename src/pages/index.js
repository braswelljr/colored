import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Generator from '@/components/Generator'
import Explore from '@/components/Explore'
import Topper from '@/components/Topper'
import Search from '@/components/Search'
import useStore from '@/store/index'

const Index = () => {
  const appName = 'colored'
  const theme = useStore(state => state.theme)
  const themeDark = useStore(state => state.themeDark)
  const themeLight = useStore(state => state.themeLight)

  /**
   * Save theme for localStorage
   */
  useEffect(() => {
    window.addEventListener('load', () => {
      if (typeof Storage !== 'undefined') {
        localStorage.getItem(appName) === null
          ? localStorage.setItem(appName, theme)
          : localStorage.getItem(appName)
      }
      localStorage.getItem(appName) === 'light' ? themeLight() : themeDark()
    })
  }, [appName])

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('load', event =>
        event.matches ? themeDark() : themeLight()
      )
  }, [])

  return (
    <main className={``}>
      {/* fixed inset-x-0 top-0 */}
      <Navbar appName={appName} />
      <Search />
      <section
        className={`w-full px-3 py-4 md:px-12 xl:px-24 lg:px-20`}
        // pt-[17.5rem]
      >
        <Explore />
      </section>
      <Topper />
      <Generator />
    </main>
  )
}

export default Index
