import type { ReactNode } from 'react'
import type { ButtonVariants } from './styles.css'
import { button } from './styles.css'

type ButtonVanillaExtractProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
  hasGreenBorder?: boolean
} & ButtonVariants

/**
 * This solution uses vanilla-extract to create styles at build time.
 */
export const ButtonVanillaExtract = ({
  children,
  className,
  sentiment,
  disabled,
  size,
  onClick,
  variant,
  gap,
  hasGreenBorder,
}: ButtonVanillaExtractProps) => (
  <button
    className={`${className ?? ''} ${button({ sentiment, disabled, size, variant, gap })}`}
    data-has-green-border={hasGreenBorder ? 'true' : undefined}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
)
