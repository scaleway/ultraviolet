import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '..'
import { styledDiv } from './DivWithBackground.css'

export const Template: StoryFn<typeof Stack> = props => (
  <Stack {...props}>
    <div className={styledDiv}>First child</div>
    <div className={styledDiv}>Second child</div>
    <div className={styledDiv}>Third child</div>
  </Stack>
)
