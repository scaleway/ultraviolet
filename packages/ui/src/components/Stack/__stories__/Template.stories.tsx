import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '..'
import { DivWithBackground } from './DivWithBackground'

export const Template: StoryFn<typeof Stack> = props => (
  <Stack {...props}>
    <DivWithBackground>First child</DivWithBackground>
    <DivWithBackground>Second child</DivWithBackground>
    <DivWithBackground>Third child</DivWithBackground>
  </Stack>
)
