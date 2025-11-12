import { MoonIcon, SunIcon } from '@ultraviolet/icons'
import { useTheme } from '@ultraviolet/themes'
import { Breakpoint, Toggle } from '@ultraviolet/ui'
import styles from '../../styles/component.module.scss'
import GithubAndDocumentationButtons from './GithubAndDocumentationButtons'
import Logo from './Logo'

type Themes = 'light' | 'dark'

const TopBar = ({ setTheme }: { setTheme: (theme: Themes) => void }) => {
  const { theme } = useTheme()

  return (
    <header className={styles.header}>
      <div className={styles.headerRow}>
        <Logo />
        <div className={styles.horizontalStack}>
          <Breakpoint up="medium">
            <GithubAndDocumentationButtons />
          </Breakpoint>
          <SunIcon size="small" />
          <Toggle
            checked={theme === 'dark'}
            name="darkMode"
            onChange={() => {
              setTheme(theme === 'light' ? 'dark' : 'light')
            }}
          />
          <MoonIcon size="small" />
        </div>
      </div>
    </header>
  )
}

export default TopBar
