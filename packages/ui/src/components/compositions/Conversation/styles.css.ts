import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'

const conversationInfosBase = style({
  alignItems: 'center',
  display: 'flex',
  margin: `0 ${theme.space[7]}`,
})

export const conversationInfos = styleVariants({
  left: [conversationInfosBase, { justifyContent: 'flex-start' }],
  right: [conversationInfosBase, { justifyContent: 'flex-end' }],
})

export const styledText = style({
  marginTop: theme.space[3],
  textAlign: 'center',
})

const conversationContainerBase = style({
  display: 'flex',
  marginBottom: theme.space[2],
})

export const conversationContainer = styleVariants({
  left: [conversationContainerBase, { flexDirection: 'row-reverse' }],
  right: [conversationContainerBase, { flexDirection: 'row' }],
})

const conversationRawMessageBase = style({
  borderRadius: theme.radii.default,
  margin: theme.space[3],
  marginBottom: 0,
  padding: theme.space[3],
})
export const conversationRawMessage = styleVariants({
  left: [
    conversationRawMessageBase,
    { backgroundColor: theme.colors.neutral.backgroundStrong },
  ],
  right: [
    conversationRawMessageBase,
    { backgroundColor: theme.colors.primary.background },
  ],
})

export const conversationAvatar = style({
  alignSelf: 'flex-end',
  display: 'flex',
})

export const conversationBubble = style({ width: '100%' })

export const conversationTag = style({
  backgroundColor: theme.colors.neutral.backgroundStrong,
  height: theme.sizing[200],
  marginRight: theme.space[1],
})
