import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'

const infosBase = style({
  alignItems: 'center',
  display: 'flex',
  margin: `0 ${theme.space[7]}`,
})

const infos = styleVariants({
  left: [infosBase, { justifyContent: 'flex-start' }],
  right: [infosBase, { justifyContent: 'flex-end' }],
})

const styledText = style({
  marginTop: theme.space[3],
  textAlign: 'center',
})

const containerBase = style({
  display: 'flex',
  marginBottom: theme.space[2],
})

const container = styleVariants({
  left: [containerBase, { flexDirection: 'row-reverse' }],
  right: [containerBase, { flexDirection: 'row' }],
})

const rawMessageBase = style({
  borderRadius: theme.radii.default,
  margin: theme.space[3],
  marginBottom: 0,
  padding: theme.space[3],
})

const rawMessage = styleVariants({
  left: [
    rawMessageBase,
    { backgroundColor: theme.colors.neutral.backgroundStrong },
  ],
  right: [rawMessageBase, { backgroundColor: theme.colors.primary.background }],
})

const avatar = style({
  alignSelf: 'flex-end',
  display: 'flex',
})

const bubble = style({ width: '100%' })

const tag = style({
  backgroundColor: theme.colors.neutral.backgroundStrong,
  height: theme.sizing[200],
  marginRight: theme.space[1],
})

export const conversationStyle = {
  infos,
  styledText,
  container,
  rawMessage,
  avatar,
  tag,
  bubble,
}
