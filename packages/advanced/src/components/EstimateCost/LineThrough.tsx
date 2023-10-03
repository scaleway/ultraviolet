import type { ReactNode } from 'react'
import { styles } from './componentStyle'

type LineThroughProps = {
  isActive?: boolean
  children: ReactNode
}

export const LineThrough = ({
  isActive = false,
  children,
}: LineThroughProps) => (
  <span css={isActive && styles.lineThrough}>{children}</span>
)
