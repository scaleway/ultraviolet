import type { CSSProperties, ReactNode } from 'react'
import { conversationStyle } from '../styles.css'

export const MessageInfos = ({
  children,
  align,
  style,
}: {
  children: ReactNode
  align: 'left' | 'right'
  style?: CSSProperties
}) => (
  <div className={conversationStyle.infos[align]} style={style}>
    {children}
  </div>
)
