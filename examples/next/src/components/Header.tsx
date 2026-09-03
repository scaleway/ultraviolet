import { MoonIcon } from '@ultraviolet/icons/MoonIcon'
import { SunIcon } from '@ultraviolet/icons/SunIcon'
import { useThemes } from '@ultraviolet/themes'
import { Toggle } from '@ultraviolet/ui'
import { cn } from '@ultraviolet/utils'
import GithubAndDocumentationButtons from './GithubAndDocumentationButtons'
import Logo from './Logo'
import styles from '../../styles/component.module.scss'

const TopBar = ({ className }: { className?: string }) => {
  const { themeName, toggleTheme } = useThemes()

  return (
    <header className={cn(className, styles.header)}>
      <div className={styles.headerRow}>
        <Logo />
        <div className={styles.horizontalStack}>
          <GithubAndDocumentationButtons />
          <SunIcon size="small" />
          <Toggle checked={themeName === 'dark'} name="themeMode" onChange={toggleTheme} />
          <MoonIcon size="small" />
        </div>
      </div>
    </header>
  )
}

export default TopBar
