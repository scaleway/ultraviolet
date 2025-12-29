import { consoleLightTheme as theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'
import background from '../assets/brand-background.png'

export const globalStyleStoryBook = style({
     fontFamily: "'Inter', sans-serif",
    fontSize: 16,

    color: theme.colors.neutral.text
})

globalStyle(`${globalStyleStoryBook} p`, { margin: 0 })


globalStyle(`${globalStyleStoryBook} h2, ${globalStyleStoryBook} h3, ${globalStyleStoryBook} h4, ${globalStyleStoryBook} h5, ${globalStyleStoryBook} h6`, { margin: `${theme.space[2]} 0 ${theme.space[1]} 0`,
 })

globalStyle(`${globalStyleStoryBook} .sb-anchor h1, ${globalStyleStoryBook} .sb-anchor h2, ${globalStyleStoryBook} .sb-anchor h3, ${globalStyleStoryBook} .sb-anchor h4, ${globalStyleStoryBook} .sb-anchor h5, ${globalStyleStoryBook} .sb-anchor h6`, { margin: "inherit" })

globalStyle(`${globalStyleStoryBook} body`, { 
    fontFamily: "'Inter', sans-serif",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24,
    color: theme.colors.neutral.text
 })


globalStyle(`${globalStyleStoryBook} h1, h2, h3, h4, h5, h3`, { 
    color: theme.colors.neutral.text
 })

globalStyle(`${globalStyleStoryBook} .toc-list-item::before`, { borderColor: `${theme.colors.primary.border} !important` })

globalStyle(`${globalStyleStoryBook} .toc-list-item`, { paddingBottom: "3px !important" })

globalStyle(`${globalStyleStoryBook} .toc-list-item.is-active-li>a`, { color: `${theme.colors.primary.text} !important` })

export const titleDecorator = style({})

globalStyle(`${titleDecorator} > h1`, {
     color: theme.colors.neutral.text,
    fontSize: theme.typography.headingLargeStronger.fontSize,
    fontFamily: theme.typography.headingLargeStronger.fontFamily,
    fontWeight: theme.typography.headingLargeStronger.weight,
    letterSpacing: theme.typography.headingLargeStronger.letterSpacing,
    lineHeight: theme.typography.headingLargeStronger.lineHeight,
    textDecoration: theme.typography.headingLargeStronger.textDecoration,
    padding: `${theme.space[5]} ${theme.space[3]}`,
    borderRadius: theme.radii.default,
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: 'no-repeat',
    width: "100%",
})

export const h2Decorator = style({
    paddingBottom: theme.space[1],
    marginBottom: `${theme.space[2]} !important`,
    borderBottom: `2px solid ${theme.colors.neutral.borderStronger}`
})

export const storiesDecorator = style({})

globalStyle(`${storiesDecorator} #stories`, {
    color: theme.colors.neutral.text,
    fontSize: theme.typography.headingStrong.fontSize,
    fontFamily: theme.typography.headingStrong.fontFamily,
    fontWeight: theme.typography.headingStrong.weight,
    letterSpacing: theme.typography.headingStrong.letterSpacing,
    lineHeight: theme.typography.headingStrong.lineHeight,
    textDecoration: theme.typography.headingStrong.textDecoration,
    paddingBottom: theme.space[1],
    borderBottom: `2px solid ${theme.colors.neutral.borderStronger}`,
    marginBottom: theme.space[2],
})
export const storiesTheme = style({})

globalStyle(`${storiesTheme} .docs-story > div`, { padding: 0})

globalStyle(`${storiesTheme} .css-xzp052 .innerZoomElementWrapper > *`, { border: "0 !important"})
