import type { ReactNode } from 'react'
import { useReducer } from 'react'
import type { ButtonVariants } from './styles.css'
import { button } from './styles.css'
import { darkTheme, ligthTheme } from './theme.css'

type ButtonSolution1Props = {
  children: ReactNode
  className?: string
  onClick?: () => void
} & ButtonVariants

/**
 * This solution uses vanilla-extract to create styles at build time.
 * Advantages:
 * - Styles are static and do not change at runtime.
 * - No runtime overhead for style calculations.
 * - Type-sage and autocompletion for styles.
 * Disadvantages:
 * - Requires build step to generate styles.
 * - Less flexibility for dynamic styles.
 */
const Button = ({
  children,
  className,
  sentiment,
  disabled,
  size,
  onClick,
}: ButtonSolution1Props) => (
  <button
    className={`${className ?? ''} ${button({ sentiment, disabled, size })}`}
    onClick={onClick}
  >
    {children}
  </button>
)

// Equivalent of App.tsx
export const ButtonSolution1 = (props: ButtonSolution1Props) => {
  const [theme, toggleTheme] = useReducer(prevState => !prevState, true)

  return (
    <div className={theme ? ligthTheme : darkTheme}>
      <button type="button" onClick={toggleTheme}>
        Switch theme
      </button>
      <br />
      <br />
      <Button {...props} />
    </div>
  )
}
