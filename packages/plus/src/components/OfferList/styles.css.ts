import { theme } from '@ultraviolet/themes'
import { createVar, globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

const SENTIMENTS = [
  'primary',
  'secondary',
  'neutral',
  'success',
  'danger',
  'warning',
  'info',
] as const

export const expandablePadding = createVar()

function createBannerStyle(
  sentiment: (typeof SENTIMENTS)[number],
  disabled: boolean,
) {
  return {
    backgroundColor:
      sentiment === 'neutral'
        ? theme.colors.neutral[
            disabled ? 'backgroundWeak' : 'backgroundWeakDisabled'
          ]
        : theme.colors[sentiment][
            disabled ? 'backgroundDisabled' : 'background'
          ],
    color: theme.colors[sentiment][disabled ? 'textDisabled' : 'text'],
  }
}
export const offerList = style({})

globalStyle(`${offerList} td:first-child, ${offerList} th:first-child`, {
  width: theme.sizing[700],
  minWidth: theme.sizing[700],
  maxWidth: theme.sizing[700],
})

export const offerListBanner = style({
  width: '100%',
  display: 'table-row',
  verticalAlign: 'middle',
  cursor: 'auto',
  background: theme.colors.neutral.backgroundWeak,
  borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
  position: 'relative',
})

globalStyle(
  `${offerListBanner} td, ${offerListBanner} td:first-child, ${offerListBanner} td:last-child`,
  {
    borderBottom: '1px solid transparent',
    transition: 'box-shadow 200ms ease, border-color 200ms ease',
  },
)

export const offerListBannerText = recipe({
  base: {
    transition: 'border-color 200ms ease',
    marginTop: `calc((${theme.space[2]} * -1) - 1px)`,
    paddingBlock: theme.space['0.5'],
    paddingInline: theme.space[1],
    borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
    border: `1px solid ${theme.colors.neutral.border}`,
    borderTopColor: 'transparent',
  },
  variants: {
    primaryBorder: {
      false: {
        border: `1px solid ${theme.colors.neutral.border}`,
        selectors: {
          '&&': { borderTop: '1px solid transparent' },
        },
      },
    },
    sentiment: Object.fromEntries(SENTIMENTS.map(sentiment => [sentiment, {}])),
    disabled: {
      true: {
        border: `1px solid ${theme.colors.neutral.border}`,
      },
    },
  },
  compoundVariants: [
    ...SENTIMENTS.map(sentiment => ({
      variants: { sentiment, disabled: false },
      style: createBannerStyle(sentiment, false),
    })),
    ...SENTIMENTS.map(sentiment => ({
      variants: { sentiment, disabled: true },
      style: createBannerStyle(sentiment, true),
    })),
    {
      variants: { primaryBorder: true, disabled: false },
      style: {
        border: `1px solid ${theme.colors.primary.border}`,
        borderTopColor: 'transparent',
      },
    },
    {
      variants: { primaryBorder: true, disabled: true },
      style: {
        borderTopColor: 'transparent',
      },
    },
  ],
  defaultVariants: {
    primaryBorder: false,
    sentiment: 'neutral',
    disabled: false,
  },
})

export const offerListBannerCell = style({
  height: 'fit-content',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  width: '100%',
  padding: 0,
})

export const offerListBannerStack = recipe({
  base: {
    height: 'fit-content',
    borderTop: `1px solid ${theme.colors.neutral.border}`,
    borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
    width: '100%',
    paddingBlock: theme.space['0.5'],
    paddingInline: theme.space[1],
    selectors: {
      "&[aria-disabled='true']": {
        backgroundColor: theme.colors.neutral.backgroundDisabled,
      },
    },
  },
  variants: {
    sentiment: Object.fromEntries(
      SENTIMENTS.map(sentiment => [
        sentiment,
        {
          backgroundColor:
            sentiment === 'neutral'
              ? theme.colors.neutral.backgroundWeak
              : theme.colors[sentiment].background,
        },
      ]),
    ),
  },
  defaultVariants: {
    sentiment: 'neutral',
  },
})

export const offerListBadge = style({
  position: 'absolute',
  transform: 'translateY(-150%)',
  top: 0,
  left: theme.space[3],
})

export const offerListBadgeContainer = style({
  position: 'absolute',
  top: theme.space[2],
})

export const offerListNoPaddingCell = style({
  padding: 0,
  width: 32,
  selectors: {
    '&:first-of-type': {
      paddingLeft: theme.space[2],
    },
  },
})

export const offerListRowSelected = style({
  color: theme.colors.primary.text,
})
export const offerListRowSelectedNotExpandable = style({})
export const offerListRowSelectedExpandable = style({})

export const offerListRowBanner = style({})

globalStyle(
  `${offerListRowSelected} td, ${offerListRowSelected} td:first-child, ${offerListRowSelected} td:last-child`,
  {
    borderColor: theme.colors.primary.border,
  },
)

globalStyle(
  `${offerListRowSelectedNotExpandable} td:nth-child(2), ${offerListRowSelectedExpandable} td:nth-child(3)`,
  {
    fontWeight: theme.typography.bodySmallStrong.weight,
  },
)

globalStyle(
  `${offerListRowSelected}[aria-expanded="true"] td, ${offerListRowSelected}[aria-expanded="true"] td:first-child, ${offerListRowSelected}[aria-expanded="true"] td:last-child, {offerListRowSelected}[aria-expanded="true"] + tr td`,
  {
    borderColor: theme.colors.primary.border,
  },
)

globalStyle(`${offerListRowBanner} td, ${offerListRowBanner} td:first-child`, {
  borderBottomLeftRadius: 0,
})

globalStyle(`${offerListRowBanner} td, ${offerListRowBanner} td:last-child`, {
  borderBottomRightRadius: 0,
})

export const offerListRowSelectableContainer = style({ display: 'flex' })

export const offerListRowExpandable = style({
  padding: expandablePadding,
})

export const offerListCell = style({ whiteSpace: 'pre-line' })

export const offerListLoadingCell = style({ height: '100%' })
