import { MoonIcon } from '@ultraviolet/icons/MoonIcon'
import { SunIcon } from '@ultraviolet/icons/SunIcon'
import { useTheme } from '@ultraviolet/themes'
import { Toggle } from '@ultraviolet/ui'
import { cn } from '@ultraviolet/utils'

import styles from '../../styles/component.module.scss'

import GithubAndDocumentationButtons from './GithubAndDocumentationButtons'
import Logo from './Logo'

type Themes = 'light' | 'dark'

const TopBar = ({
  setTheme,
  className,
}: {
  setTheme: (theme: Themes) => void
  className?: string
}) => {
  const { theme } = useTheme()

  return (
    <header className={cn(className, styles.header)}>
      <div className={styles.headerRow}>
        <Logo />
        <div className={styles.horizontalStack}>
          <GithubAndDocumentationButtons />
          <SunIcon size="small" />
          <Toggle
            checked={theme === 'dark'}
            name="themeMode"
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
