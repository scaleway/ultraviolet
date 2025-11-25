import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'

export const wrapperWidth = createVar()

function createColor(color: string, opacity: number) {
  return `rgb(from ${color} r g b / ${opacity})`
}
export const wrapperBarStack = style({
  width: wrapperWidth,
  transition: 'width 500ms',
  backgroundColor: theme.colors.neutral.backgroundWeak,
  selectors: {
    '&:nth-child(5n+1)': {
      background: `linear-gradient(-45deg, ${createColor(theme.colors.neutral.backgroundWeak, 0.1)} 25%,
      ${theme.colors.primary.backgroundStrong} 25%, ${theme.colors.primary.backgroundStrong} 50%,
      ${createColor(theme.colors.neutral.backgroundWeak, 0.1)} 50%, ${createColor(theme.colors.neutral.backgroundWeak, 0.1)} 75%, ${theme.colors.primary.backgroundStrong}
       75%)`,
      backgroundSize: '30px 30px',
      backgroundColor: theme.colors.primary.backgroundStrong,
    },
    '&:nth-child(5n+2)': {
      backgroundColor: `color-mix(in srgb, ${theme.colors.primary.backgroundStrong} 85%, transparent)`,
      backgroundImage: `linear-gradient(
        135deg,
        ${createColor(theme.colors.neutral.backgroundStrong, 0.2)} 25%,
        transparent 25%
      ),
      linear-gradient(
        225deg,
        ${createColor(theme.colors.neutral.backgroundStrong, 0.2)} 25%,
        transparent 25%
      ),
      linear-gradient(
        45deg,
        ${createColor(theme.colors.neutral.backgroundStrong, 0.2)} 25%,
        transparent 25%
      ),
      linear-gradient(
        315deg,
        ${createColor(theme.colors.neutral.backgroundStrong, 0.2)} 25%,
        ${createColor(theme.colors.primary.backgroundStrong, 0.07)} 25%
      )`,
      backgroundPosition: '10px 0, 10px 0, 0 0, 0 0',
      backgroundSize: '10px 10px',
      backgroundRepeat: 'repeat',
    },
    '&:nth-child(5n+3)': {
      background: `linear-gradient(-45deg, ${createColor(theme.colors.neutral.backgroundWeak, 0.1)} 25%,
      ${createColor(theme.colors.primary.backgroundStrong, 0.3)} 25%, ${createColor(theme.colors.primary.backgroundStrong, 0.3)} 50%,
      ${createColor(theme.colors.neutral.backgroundWeak, 0.1)} 50%, ${createColor(theme.colors.neutral.backgroundWeak, 0.1)} 75%, ${createColor(theme.colors.primary.backgroundStrong, 0.3)}
       75%)`,
      backgroundSize: '30px 30px',
      backgroundColor: theme.colors.secondary.backgroundStrong,
    },
    '&:nth-child(5n+4)': {
      backgroundColor: theme.colors.secondary.backgroundStrong,
      backgroundImage: ` linear-gradient(
        135deg,
        ${createColor(theme.colors.neutral.backgroundWeak, 0.2)} 25%,
        transparent 25%
      ),
      linear-gradient(
        225deg,
        ${createColor(theme.colors.neutral.backgroundWeak, 0.2)} 25%,
        transparent 25%
      ),
      linear-gradient(
        45deg,
        ${createColor(theme.colors.neutral.backgroundWeak, 0.2)} 25%,
        transparent 25%
      ),
      linear-gradient(
        315deg,
        ${createColor(theme.colors.neutral.backgroundWeak, 0.2)} 25%,
        ${theme.colors.secondary.backgroundStrong} 25%
      )`,
      backgroundPosition: '10px 0, 10px 0, 0 0, 0 0',
      backgroundSize: '10px 10px',
      backgroundRepeat: 'repeat',
    },
    '&:nth-child(5n+5)': {
      background: `linear-gradient(-45deg, ${createColor(theme.colors.neutral.backgroundWeak, 0.25)} 25%,
      ${createColor(theme.colors.secondary.borderStrong, 0.25)} 25%, ${createColor(theme.colors.secondary.borderStrong, 0.25)} 50%,
      ${createColor(theme.colors.neutral.backgroundWeak, 0.25)} 50%, ${createColor(theme.colors.neutral.backgroundWeak, 0.25)} 75%, ${createColor(theme.colors.secondary.borderStrong, 0.25)}
       75%);`,
      backgroundSize: '30px 30px',
      backgroundColor: `${createColor(theme.colors.secondary.borderStrong, 0.75)}`,
    },
  },
})

export const barStack = style({
  height: theme.sizing[700],
  fontWeight: theme.typography.bodySmallStronger.weight,
  color: theme.colors.neutral.backgroundWeak,
  fontSize: theme.typography.bodySmallStronger.fontSize,
  display: 'flex',
  alignItems: 'center',
  padding: theme.space[1],
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textShadow: `-1px 0
      ${theme.colors.neutral.backgroundStronger},
    0 1px ${createColor(theme.colors.neutral.backgroundStronger, 0.7)},
    1px 0 ${createColor(theme.colors.neutral.backgroundStronger, 0.7)},
    0 -1px ${createColor(theme.colors.neutral.backgroundStronger, 0.7)}`,
})

export const containerBarStack = style({
  width: '100%',
  display: 'flex',
  backgroundColor: theme.colors.neutral.backgroundWeak,
  borderRadius: theme.radii.default,
  boxShadow: theme.shadows.defaultShadow,
  overflow: 'hidden',
})
