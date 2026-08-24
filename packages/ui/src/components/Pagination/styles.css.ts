import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'

const paginationContainer = style({
  containerType: 'inline-size',
})

const pageNumbersContainer = style({
  margin: `0 ${theme.space['1']}`,
})

const pageButton = styleVariants({
  medium: { width: theme.sizing[500] },
  small: { width: theme.sizing[400] },
})

const hiddenOnSmall = styleVariants({
  medium: {
    '@container': {
      '(max-width: 320px)': {
        display: 'none',
      },
    },
  },
  small: {
    '@container': {
      '(max-width: 280px)': {
        display: 'none',
      },
    },
  },
})

const showOnSmall = styleVariants({
  medium: {
    display: 'none',
    '@container': {
      '(max-width: 320px)': {
        display: 'flex',
      },
    },
  },
  small: {
    display: 'none',
    '@container': {
      '(max-width: 280px)': {
        display: 'flex',
      },
    },
  },
})

const ellipsisBase = style({
  alignContent: 'center',
  padding: theme.space[1],
})

const ellipsisClass = styleVariants({
  medium: [
    ellipsisBase,
    {
      height: theme.sizing[500],
      width: theme.sizing[500],
    },
  ],
  small: [
    ellipsisBase,
    {
      height: theme.sizing[400],
      width: theme.sizing[400],
    },
  ],
})

export const paginationStyle = {
  paginationContainer,
  pageNumbersContainer,
  pageButton,
  hiddenOnSmall,
  showOnSmall,
  ellipsisClass,
}
