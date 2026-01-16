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
  maxWidth: theme.sizing[700],
  minWidth: theme.sizing[700],
  width: theme.sizing[700],
})

export const offerListBanner = style({
  background: theme.colors.neutral.backgroundWeak,
  borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
  cursor: 'auto',
  display: 'table-row',
  position: 'relative',
  verticalAlign: 'middle',
  width: '100%',
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
    border: `1px solid ${theme.colors.neutral.border}`,
    borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
    borderTopColor: 'transparent',
    marginTop: `calc((${theme.space[2]} * -1) - 1px)`,
    paddingBlock: theme.space['0.5'],
    paddingInline: theme.space[1],
    transition: 'border-color 200ms ease',
  },
  compoundVariants: [
    ...SENTIMENTS.map(sentiment => ({
      style: createBannerStyle(sentiment, false),
      variants: { disabled: false, sentiment },
    })),
    ...SENTIMENTS.map(sentiment => ({
      style: createBannerStyle(sentiment, true),
      variants: { disabled: true, sentiment },
    })),
    {
      style: {
        border: `1px solid ${theme.colors.primary.border}`,
        borderTopColor: 'transparent',
      },
      variants: { disabled: false, primaryBorder: true },
    },
    {
      style: {
        borderTopColor: 'transparent',
      },
      variants: { disabled: true, primaryBorder: true },
    },
  ],
  defaultVariants: {
    disabled: false,
    primaryBorder: false,
    sentiment: 'neutral',
  },
  variants: {
    disabled: {
      true: {
        border: `1px solid ${theme.colors.neutral.border}`,
      },
    },
    primaryBorder: {
      false: {
        border: `1px solid ${theme.colors.neutral.border}`,
        selectors: {
          '&&': { borderTop: '1px solid transparent' },
        },
      },
    },
    sentiment: Object.fromEntries(SENTIMENTS.map(sentiment => [sentiment, {}])),
  },
})

export const offerListBannerCell = style({
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  height: 'fit-content',
  padding: 0,
  width: '100%',
})

export const offerListBannerStack = recipe({
  base: {
    borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
    borderTop: `1px solid ${theme.colors.neutral.border}`,
    height: 'fit-content',
    paddingBlock: theme.space['0.5'],
    paddingInline: theme.space[1],
    selectors: {
      "&[aria-disabled='true']": {
        backgroundColor: theme.colors.neutral.backgroundDisabled,
      },
    },
    width: '100%',
  },
  defaultVariants: {
    sentiment: 'neutral',
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
})

export const offerListBadge = style({
  left: theme.space[5],
  position: 'absolute',
  transform: 'translateY(-160%)',
})

export const offerListNoPaddingCell = style({
  padding: 0,
  selectors: {
    '&:first-of-type': {
      paddingLeft: theme.space[2],
    },
  },
  width: 32,
})

export const offerListRowSelected = style({
  color: theme.colors.primary.text,
})
export const offerListRowSelectedNotExpandable = style({
  cursor: 'pointer',
})
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
  `${offerListRowSelected}[aria-expanded="true"] td, ${offerListRowSelected}[aria-expanded="true"] td:first-child, ${offerListRowSelected}[aria-expanded="true"] td:last-child, ${offerListRowSelected}[aria-expanded="true"] + tr td`,
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
