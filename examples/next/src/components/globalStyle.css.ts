import { theme } from '@ultraviolet/themes'
import { globalFontFace, globalStyle } from '@vanilla-extract/css'

globalStyle('html', { height: '100%' })

globalStyle('body', {
  backgroundColor: theme.colors.neutral.backgroundWeak,
  color: theme.colors.neutral.text,
  fontFamily: theme.typography.body.fontFamily,
})

globalStyle('a', { color: theme.colors.info.text, textDecoration: 'none' })

globalStyle('a:hover, a:focus, a:active', {
  color: theme.colors.info.textHover,
  textDecoration: 'underline',
})

globalStyle('*', { transition: 'all 500ms ease' })
globalFontFace('Asap', {
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: '400',
  src: "url('/fonts/asap/Asap-Regular.woff2') format('woff2')",
})

globalFontFace('Asap', {
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: '500',
  src: "url('/fonts/asap/Asap-Medium.woff2') format('woff2')",
})

globalFontFace('Asap', {
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: '700',
  src: "url('/fonts/asap/Asap-Bold.woff2') format('woff2')",
})

globalFontFace('JetBrains', {
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: '400',
  src: "url('/fonts/jetbrains/JetBrainsMono-Regular.woff2') format('woff2')",
})
