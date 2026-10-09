import { MoonIcon } from '@ultraviolet/icons/MoonIcon'
import { SunIcon } from '@ultraviolet/icons/SunIcon'
import { useTheme } from '@ultraviolet/themes/v2'
import { Checkbox, Toggle } from '@ultraviolet/ui'
import { cn } from '@ultraviolet/utils'
import GithubAndDocumentationButtons from './GithubAndDocumentationButtons'
import Logo from './Logo'
import styles from '../../styles/component.module.css'

const TopBar = ({ className }: { className?: string }) => {
  const { theme, setTheme, isSystem } = useTheme()
  return (
    <header className={cn(className, styles.header)}>
      <div className={styles.headerRow}>
        <Logo />
        <div className={styles.horizontalStack}>
          <GithubAndDocumentationButtons />
          <SunIcon size="small" />
          <Toggle
            disabled={isSystem}
            checked={theme === 'dark'}
            name="themeMode"
            onChange={() => {
              setTheme(theme === 'light' ? 'dark' : 'light')
            }}
          />
          <MoonIcon size="small" />
          <Checkbox
            value="isSystem"
            checked={isSystem}
            onChange={() => {
              if (isSystem) {
                setTheme(theme)
              } else {
                setTheme('system')
              }
            }}
          >
            Use system theme
          </Checkbox>
        </div>
      </div>
    </header>
  )
}

export default TopBar
