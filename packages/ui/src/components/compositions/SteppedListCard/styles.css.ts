import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const steppedListCard = style({ padding: 0 })

export const steppedListCardWrapper = style({
  borderRight: `1px solid ${theme.colors.neutral.border}`,
  padding: theme.space[3],
})

export const steppedListCardContent = style({
  minWidth: 0,
  padding: theme.space[3],
  paddingTop: theme.space[4],
})

export const steppedListCardImage = style({
  display: 'flex',
  justifyContent: 'right',
})

export const steppedListCardSubHeader = style({
  marginBottom: theme.space[3],
})

export const steppedListCardStepTitle = style({
  cursor: 'pointer',
  selectors: {
    '&:active': {
      textDecorationThickness: 2,
    },
    '&:hover': {
      textDecoration: 'underline',
      textDecorationThickness: 1,
    },
  },
  textDecoration: 'underline',
  textDecorationColor: 'transparent',
  textDecorationThickness: 1,
  textUnderlineOffset: 2,
  transition: 'text-decoration-color 250ms ease-out',
})

export const steppedListCardStep = style({
  alignItems: 'center',
})

export const hideButton = style({
  width: 'fit-content',
})
