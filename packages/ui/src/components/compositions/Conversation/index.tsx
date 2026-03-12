'use client'

import type { CSSProperties, ReactNode } from 'react'
import { Stack } from '../../Stack'
import { DateComponent } from './components/Date'
import { Message } from './components/Message'
import { MessageInfos } from './components/MessageInfos'
import { MessageTag } from './components/MessageTag'

const Conversation = ({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) => <Stack style={style}>{children}</Stack>

Conversation.Date = DateComponent
Conversation.Message = Message
Conversation.MessageInfos = MessageInfos
Conversation.Tag = MessageTag

export { Conversation }
