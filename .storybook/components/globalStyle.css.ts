import { consoleLightTheme as theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'
import background from '../assets/brand-background.png'

export const globalStyleStoryBook = style({
  color: theme.colors.neutral.text,
  fontFamily: "'Inter', sans-serif",
  fontSize: 16,
})

globalStyle(`${globalStyleStoryBook} p`, { margin: 0 })

globalStyle(
  `${globalStyleStoryBook} h2, ${globalStyleStoryBook} h3, ${globalStyleStoryBook} h4, ${globalStyleStoryBook} h5, ${globalStyleStoryBook} h6`,
  { margin: `${theme.space[2]} 0 ${theme.space[1]} 0` },
)

globalStyle(
  `${globalStyleStoryBook} .sb-anchor h1, ${globalStyleStoryBook} .sb-anchor h2, ${globalStyleStoryBook} .sb-anchor h3, ${globalStyleStoryBook} .sb-anchor h4, ${globalStyleStoryBook} .sb-anchor h5, ${globalStyleStoryBook} .sb-anchor h6`,
  { margin: 'inherit' },
)

globalStyle(`${globalStyleStoryBook} body`, {
  color: theme.colors.neutral.text,
  fontFamily: "'Inter', sans-serif",
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 24,
})

globalStyle(`${globalStyleStoryBook} h1, h2, h3, h4, h5, h3`, {
  color: theme.colors.neutral.text,
})

globalStyle(`${globalStyleStoryBook} .toc-list-item::before`, {
  borderColor: `${theme.colors.primary.border} !important`,
})

globalStyle(`${globalStyleStoryBook} .toc-list-item`, {
  paddingBottom: '3px !important',
})

globalStyle(`${globalStyleStoryBook} .toc-list-item.is-active-li>a`, {
  color: `${theme.colors.primary.text} !important`,
})

export const titleDecorator = style({})

globalStyle(`${titleDecorator} > h1`, {
  backgroundImage: `url(${background})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  borderRadius: theme.radii.default,
  color: theme.colors.neutral.text,
  fontFamily: theme.typography.headingLargeStronger.fontFamily,
  fontSize: theme.typography.headingLargeStronger.fontSize,
  fontWeight: theme.typography.headingLargeStronger.weight,
  letterSpacing: theme.typography.headingLargeStronger.letterSpacing,
  lineHeight: theme.typography.headingLargeStronger.lineHeight,
  padding: `${theme.space[5]} ${theme.space[3]}`,
  textDecoration: theme.typography.headingLargeStronger.textDecoration,
  width: '100%',
})

export const h2Decorator = style({
  borderBottom: `2px solid ${theme.colors.neutral.borderStronger}`,
  marginBottom: `${theme.space[2]} !important`,
  paddingBottom: theme.space[1],
})

export const storiesDecorator = style({})

globalStyle(`${storiesDecorator} #stories`, {
  borderBottom: `2px solid ${theme.colors.neutral.borderStronger}`,
  color: theme.colors.neutral.text,
  fontFamily: theme.typography.headingStrong.fontFamily,
  fontSize: theme.typography.headingStrong.fontSize,
  fontWeight: theme.typography.headingStrong.weight,
  letterSpacing: theme.typography.headingStrong.letterSpacing,
  lineHeight: theme.typography.headingStrong.lineHeight,
  marginBottom: theme.space[2],
  paddingBottom: theme.space[1],
  textDecoration: theme.typography.headingStrong.textDecoration,
})
export const storiesTheme = style({})

globalStyle(`${storiesTheme} .docs-story > div`, { padding: 0 })

globalStyle(`${storiesTheme} .css-xzp052 .innerZoomElementWrapper > *`, {
  border: '0 !important',
})
