import type { CSSProperties, ReactNode } from 'react'
import { Text } from '../../../components/Text'
import { conversationStyle } from '../styles.css'

export const DateComponent = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <Text as="p" className={conversationStyle.styledText} prominence="weak" style={style} variant="bodySmall">
    {children}
  </Text>
)

DateComponent.displayName = 'Conversation.Date'
