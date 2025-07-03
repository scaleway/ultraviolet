import type { StoryFn } from '@storybook/react'
import { Stack } from '../../Stack'
import { DivWithBackground } from './DivWithBackground'

export const Responsive: StoryFn = props => (
  <Stack
    {...props}
    direction={{ xxsmall: 'column', xsmall: 'row', small: 'row' }}
    gap={{ xxsmall: 1, xsmall: 2, small: 3 }}
  >
    <DivWithBackground data-width-full>First child</DivWithBackground>
    <DivWithBackground data-width-full>Second child</DivWithBackground>
    <DivWithBackground data-width-full>Third child</DivWithBackground>
  </Stack>
)

Responsive.parameters = {
  docs: {
    description: {
      story:
        'You can set different type of `direction` and `gap` according to theme breakpoints. We recommend switching to [story view mode](/story/components-layout-row--responsive) and in the top bar select screen size to test on different breakpoints.',
    },
  },
}
