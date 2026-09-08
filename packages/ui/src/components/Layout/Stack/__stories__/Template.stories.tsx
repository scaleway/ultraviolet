import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '..'
import { child, firstChild, secondChild, thirdChild } from './styles.css'

export const Template: StoryFn<typeof Stack> = props => (
  <Stack {...props}>
    <div className={`${child} ${firstChild}`}>First child</div>
    <div className={`${child} ${secondChild}`}>Second child</div>
    <div className={`${child} ${thirdChild}`}>Third child</div>
  </Stack>
)
