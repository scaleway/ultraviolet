import type { CSSProperties, ReactNode } from 'react'
import { Tag } from '../../../components/Tag'
import { conversationStyle } from '../styles.css'

export const MessageTag = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <Tag className={conversationStyle.tag} style={style}>
    {children}
  </Tag>
)

MessageTag.displayName = 'Conversation.Tag'
