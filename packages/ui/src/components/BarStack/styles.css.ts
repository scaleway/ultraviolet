import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import {
  neutralStrong33,
  neutralStrongerB3,
  neutralWeak1A,
  neutralWeak33,
  neutralWeak40,
  primaryStrong12,
  primaryStrong4D,
  secondaryStrong40,
  secondaryStrongBF,
  wrapperWidth,
} from './variables.css'

export const wrapperBarStack = style({
  width: wrapperWidth,
  transition: 'width 500ms',
  backgroundColor: theme.colors.neutral.backgroundWeak,
  selectors: {
    '&:nth-child(5n+1)': {
      background: `linear-gradient(-45deg, ${neutralWeak1A} 25%,
      ${theme.colors.primary.backgroundStrong} 25%, ${theme.colors.primary.backgroundStrong} 50%,
      ${neutralWeak1A} 50%, ${neutralWeak1A} 75%, ${theme.colors.primary.backgroundStrong}
       75%)`,
      backgroundSize: '30px 30px',
      backgroundColor: theme.colors.primary.backgroundStrong,
    },
    '&:nth-child(5n+2)': {
      backgroundColor: `color-mix(in srgb, ${theme.colors.primary.backgroundStrong} 85%, transparent)`,
      backgroundImage: `linear-gradient(
        135deg,
        ${neutralStrong33} 25%,
        transparent 25%
      ),
      linear-gradient(
        225deg,
        ${neutralStrong33} 25%,
        transparent 25%
      ),
      linear-gradient(
        45deg,
        ${neutralStrong33} 25%,
        transparent 25%
      ),
      linear-gradient(
        315deg,
        ${neutralStrong33} 25%,
        ${primaryStrong12} 25%
      )`,
      backgroundPosition: '10px 0, 10px 0, 0 0, 0 0',
      backgroundSize: '10px 10px',
      backgroundRepeat: 'repeat',
    },
    '&:nth-child(5n+3)': {
      background: `linear-gradient(-45deg, ${neutralWeak1A} 25%,
      ${primaryStrong4D} 25%, ${primaryStrong4D} 50%,
      ${neutralWeak1A} 50%, ${neutralWeak1A} 75%, ${primaryStrong4D}
       75%)`,
      backgroundSize: '30px 30px',
      backgroundColor: theme.colors.secondary.backgroundStrong,
    },
    '&:nth-child(5n+4)': {
      backgroundColor: theme.colors.secondary.backgroundStrong,
      backgroundImage: ` linear-gradient(
        135deg,
        ${neutralWeak33} 25%,
        transparent 25%
      ),
      linear-gradient(
        225deg,
        ${neutralWeak33} 25%,
        transparent 25%
      ),
      linear-gradient(
        45deg,
        ${neutralWeak33} 25%,
        transparent 25%
      ),
      linear-gradient(
        315deg,
        ${neutralWeak33} 25%,
        ${theme.colors.secondary.backgroundStrong} 25%
      )`,
      backgroundPosition: '10px 0, 10px 0, 0 0, 0 0',
      backgroundSize: '10px 10px',
      backgroundRepeat: 'repeat',
    },
    '&:nth-child(5n+5)': {
      background: `linear-gradient(-45deg, ${neutralWeak40} 25%,
      ${secondaryStrong40} 25%, ${secondaryStrong40} 50%,
      ${neutralWeak40} 50%, ${neutralWeak40} 75%, ${secondaryStrong40}
       75%);`,
      backgroundSize: '30px 30px',
      backgroundColor: `${secondaryStrongBF}`,
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
      ${neutralStrongerB3},
    0 1px ${neutralStrongerB3},
    1px 0 ${neutralStrongerB3},
    0 -1px ${neutralStrongerB3}`,
})

export const containerBarStack = style({
  width: '100%',
  display: 'flex',
  backgroundColor: theme.colors.neutral.backgroundWeak,
  borderRadius: theme.radii.default,
  boxShadow: theme.shadows.defaultShadow,
  overflow: 'hidden',
})
