import type { ReactNode } from 'react'
import { revealOnHover } from './styles.css'

export const RevealOnHover = ({
  content,
  hoverContent,
}: {
  content: ReactNode
  hoverContent: ReactNode
}) => (
  <div className={revealOnHover}>
    <div data-visibility="unhover">{content}</div>
    <div data-visibility="hover">{hoverContent}</div>
  </div>
)
