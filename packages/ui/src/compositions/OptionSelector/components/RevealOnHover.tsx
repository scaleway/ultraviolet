import { optionSelectorStyle } from '../styles.css'

import type { ReactNode } from 'react'

export const RevealOnHover = ({
  content,
  hoverContent,
}: {
  content: ReactNode
  hoverContent: ReactNode
}) => (
  <>
    <div
      className={optionSelectorStyle.revealOnHover}
      data-visibility="unhover"
    >
      {content}
    </div>
    <div className={optionSelectorStyle.revealOnHover} data-visibility="hover">
      {hoverContent}
    </div>
  </>
)
