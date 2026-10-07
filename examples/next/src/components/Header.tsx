import { MoonIcon } from '@ultraviolet/icons/MoonIcon'
import { SunIcon } from '@ultraviolet/icons/SunIcon'
import { useThemeV2 } from '@ultraviolet/themes'
import { Toggle } from '@ultraviolet/ui'
import { cn } from '@ultraviolet/utils'
import GithubAndDocumentationButtons from './GithubAndDocumentationButtons'
import Logo from './Logo'
import styles from '../../styles/component.module.css'

const TopBar = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useThemeV2()

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
