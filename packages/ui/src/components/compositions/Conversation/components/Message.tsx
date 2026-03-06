import { cn } from '@ultraviolet/utils'
import type { CSSProperties, ReactNode } from 'react'
import { conversationStyle } from '../styles.css'

type MessageProps = {
  className?: string
  children: ReactNode
  avatar: ReactNode
  align?: 'left' | 'right'
  style?: CSSProperties
}

export const Message = ({
  className,
  children,
  avatar,
  align = 'right',
  style,
}: MessageProps) => (
  <div
    className={cn(className, conversationStyle.container[align])}
    style={style}
  >
    <div className={conversationStyle.bubble}>
      <div className={conversationStyle.rawMessage[align]}>{children}</div>
    </div>
    <div className={conversationStyle.avatar}>{avatar}</div>
  </div>
)
