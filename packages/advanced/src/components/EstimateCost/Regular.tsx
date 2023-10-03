import type { ReactNode } from 'react'
import { useOverlay } from './OverlayContext'
import { styles } from './componentStyle'

type RegularProps = {
  variant?: 'normal' | 'small' | 'big' | 'capitalized'
  isDisabledOnOverlay?: boolean
  children?: ReactNode
  className?: string
}

export const Regular = ({
  variant = 'normal',
  isDisabledOnOverlay = false,
  children = null,
  className,
}: RegularProps) => {
  const { isOverlay } = useOverlay()

  return !isDisabledOnOverlay || !isOverlay ? (
    <div className={className} css={styles.regular(variant, isOverlay)}>
      {children}
    </div>
  ) : null
}
