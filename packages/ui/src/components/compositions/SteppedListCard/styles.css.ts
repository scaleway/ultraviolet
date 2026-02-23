import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

const steppedListCard = style({ padding: 0 })

const wrapper = style({
  borderRight: `1px solid ${theme.colors.neutral.border}`,
  padding: theme.space[3],
})

const content = style({
  minWidth: 0,
  padding: theme.space[3],
  paddingTop: theme.space[4],
})

const image = style({
  display: 'flex',
  justifyContent: 'right',
})

const subHeader = style({
  marginBottom: theme.space[3],
})

const stepTitle = style({
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

const step = style({
  alignItems: 'center',
})

const hideButton = style({
  width: 'fit-content',
})

export const steppedListCardStyle = {
  steppedListCard,
  wrapper,
  content,
  image,
  subHeader,
  stepTitle,
  step,
  hideButton,
}
