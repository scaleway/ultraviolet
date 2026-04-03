import { Tag } from '../../../components/Tag'
import { conversationStyle } from '../styles.css'

import type { CSSProperties, ReactNode } from 'react'

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
