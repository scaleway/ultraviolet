import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const plansIconWrapper = style({ all: 'unset', cursor: 'pointer' })

export const plans = style({
  borderCollapse: 'separate',
  borderSpacing: `${theme.space[2]} 0`,

  // Needed to have full height div in header cell
  height: 1,

  // Needed to compensate border-spacing behavior
  margin: `0 calc(-1 * ${theme.space[2]})`,
  tableLayout: 'fixed',
  width: `calc(100% + ${theme.space[4]})`,
})

export const plansOutOfStockBadge = style({
  bottom: '100%',
  left: '50%',
  position: 'absolute',
  transform: 'translateX(-50%) translateY(50%)',
})

export const plansCell = recipe({
  base: {
    backgroundColor: 'transparent',
    outline: 'none',
    padding: theme.space[1],
    selectors: {
      '&:first-child': {
        textAlign: 'left',
      },
      'tbody &:not(:first-child)': {
        border: `1px solid ${theme.colors.neutral.border}`,
        borderWidth: '0 1px',
      },
      'tbody tr:last-child &': {
        paddingBottom: theme.space[4],
      },
      'tbody tr:last-child &:not(:first-child)': {
        border: `1px solid ${theme.colors.neutral.border}`,
        borderRadius: `0 0 ${theme.radii.large} ${theme.radii.large}`,
        borderWidth: '0 1px 1px 1px',
      },
      'thead &': {
        height: '100%',
        paddingBottom: theme.space[3],
        paddingTop: theme.space[4],
        position: 'relative',
        verticalAlign: 'top',
      },
      'thead &:first-child': {
        verticalAlign: 'bottom',
      },
      'thead &:not(:first-child)': {
        border: `1px solid ${theme.colors.neutral.border}`,
        borderRadius: `${theme.radii.large} ${theme.radii.large} 0 0`,
        borderWidth: '1px 1px 0 1px',
      },
    },
    textAlign: 'center',
  },
  defaultVariants: {
    activeColor: false,
    disabled: false,
    focus: false,
    hide: false,
    hideLabels: false,
    selectable: false,
    spaceAfter: false,
  },
  variants: {
    activeColor: {
      true: {
        selectors: {
          'thead &:not(:first-child), tbody &:not(:first-child), tbody tr:last-child &:not(:first-child)':
            {
              borderColor: theme.colors.primary.border,
            },
        },
      },
    },
    disabled: {
      true: {
        backgroundColor: theme.colors.neutral.backgroundDisabled,
      },
    },
    focus: {
      true: {
        selectors: {
          'thead &:not(:first-child), tbody &:not(:first-child), tbody tr:last-child &:not(:first-child)':
            {
              borderColor: 'blue',
              borderWidth: '2px 2px 0 2px',
            },
        },
      },
    },
    hide: {
      true: {
        display: 'none',
      },
    },
    hideLabels: {
      true: {
        paddingLeft: theme.space[3],
        textAlign: 'start',
        selectors: {
          'thead &': {
            paddingLeft: theme.space[1],
          },
        },
      },
    },
    selectable: {
      true: {
        cursor: 'pointer',
      },
    },
    spaceAfter: {
      true: {
        selectors: {
          'tbody &': {
            paddingBottom: theme.space[6],
          },
        },
      },
    },
  },
})

export const plansRowHidden = style({ display: 'none' })

export const plansUppercaseText = style({ textTransform: 'uppercase' })

export const plansHeaderInput = style({
  left: 0,
  opacity: 0,
  position: 'absolute',
  top: 0,
})

export const plansHeaderFullHeight = style({ height: '100%' })

export const plansDescription = style({
  padding: theme.space[1],
  width: '100%',
})

export const plansFullSizeSeparator = style({ width: '100%' })

export const plansCurrentWrapper = style({
  alignItems: 'center',
  display: 'flex',
  /* Same as button */
  height: theme.sizing[600],
})
