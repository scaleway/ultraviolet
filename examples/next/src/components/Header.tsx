import { MoonIcon, SunIcon } from '@ultraviolet/icons'
import { useTheme } from '@ultraviolet/themes'
import { Breakpoint, Toggle } from '@ultraviolet/ui'
import { header, headerRow, horizontalStack } from './componentsStyles.css'
import GithubAndDocumentationButtons from './GithubAndDocumentationButtons'
import Logo from './Logo'

const TopBar = () => {
  const { theme } = useTheme()

  return (
    <header className={header}>
      <div className={headerRow}>
        <Logo />
        <div className={horizontalStack}>
          <Breakpoint up="medium">
            <GithubAndDocumentationButtons />
          </Breakpoint>
          <SunIcon size="small" />
          <Toggle checked={theme === 'dark'} name="darkMode" />
          <MoonIcon size="small" />
        </div>
      </div>
    </header>
  )
}

export default TopBar
