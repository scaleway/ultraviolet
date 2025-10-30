import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const plansIconWrapper = style({ cursor: 'pointer' })

export const plans = style({
  tableLayout: 'fixed',
  borderCollapse: 'separate',
  borderSpacing: `${theme.space[2]} 0`,

  // Needed to compensate border-spacing behavior
  margin: `0 calc(-1 * ${theme.space[2]})`,
  width: `calc(100% + ${theme.space[4]})`,

  // Needed to have full height div in header cell
  height: 1,
})

export const plansOutOfStockBadge = style({
  position: 'absolute',
  bottom: '100%',
  left: '50%',
  transform: 'translateX(-50%) translateY(50%)',
})

export const plansCell = recipe({
  base: {
    backgroundColor: 'transparent',
    outline: 'none',
    padding: theme.space[1],
    textAlign: 'center',
    selectors: {
      '&:first-child': {
        textAlign: 'left',
      },
      'thead &': {
        height: '100%',
        verticalAlign: 'top',
        position: 'relative',
        paddingTop: theme.space[4],
        paddingBottom: theme.space[3],
      },
      'thead &:first-child': {
        verticalAlign: 'bottom',
      },
      'thead &:not(:first-child)': {
        border: `1px solid ${theme.colors.neutral.border}`,
        borderRadius: `${theme.radii.large} ${theme.radii.large} 0 0`,
        borderWidth: '1px 1px 0 1px',
      },
      'tbody &:not(:first-child)': {
        border: `1px solid ${theme.colors.neutral.border}`,
        borderWidth: '0 1px',
      },
      'tbody tr:last-child &:not(:first-child)': {
        border: `1px solid ${theme.colors.neutral.border}`,
        borderRadius: `0 0 ${theme.radii.large} ${theme.radii.large}`,
        borderWidth: '0 1px 1px 1px',
      },
      'tbody tr:last-child &': {
        paddingBottom: theme.space[4],
      },
    },
  },
  variants: {
    disabled: {
      true: {
        backgroundColor: theme.colors.neutral.backgroundDisabled,
      },
    },
    hide: {
      true: {
        display: 'none',
      },
    },
    selectable: {
      true: {
        cursor: 'pointer',
      },
    },
    hideLabels: {
      true: {
        textAlign: 'start',
        paddingLeft: theme.space[3],
      },
    },
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
  defaultVariants: {
    disabled: false,
    hide: false,
    selectable: false,
    hideLabels: false,
    activeColor: false,
    focus: false,
    spaceAfter: false,
  },
})

export const plansRowHidden = style({ display: 'none' })

export const plansUppercaseText = style({ textTransform: 'uppercase' })
