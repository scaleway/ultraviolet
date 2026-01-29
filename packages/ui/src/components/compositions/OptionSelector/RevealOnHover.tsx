import type { ReactNode } from 'react'
import { revealOnHover } from './styles.css'

export const RevealOnHover = ({
  content,
  hoverContent,
}: {
  content: ReactNode
  hoverContent: ReactNode
}) => (
  <>
    <div className={revealOnHover} data-visibility="unhover">
      {content}
    </div>
    <div className={revealOnHover} data-visibility="hover">
      {hoverContent}
    </div>
  </>
)
