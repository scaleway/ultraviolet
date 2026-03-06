import type { CSSProperties, ReactNode } from 'react'
import { Tag } from '../../../Tag'
import { conversationStyle } from '../styles.css'

export const MessageTag = ({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) => (
  <Tag className={conversationStyle.tag} style={style}>
    {children}
  </Tag>
)
