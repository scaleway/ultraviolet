import type { ReactNode } from 'react'
import { Regular } from './Regular'
import { styles } from './componentStyle'

type StrongProps = {
  variant?: 'normal' | 'small' | 'big' | 'capitalized'
  isDisabledOnOverlay?: boolean
  children: ReactNode
}

export const Strong = ({
  variant = 'normal',
  isDisabledOnOverlay = false,
  children,
}: StrongProps) => (
  <Regular
    variant={variant}
    css={styles.strong(variant)}
    isDisabledOnOverlay={isDisabledOnOverlay}
  >
    {children}
  </Regular>
)
