import type { StoryFn } from '@storybook/react'
import { Checkbox } from '..'

export const Template: StoryFn<typeof Checkbox> = ({
  'aria-label': ariaLabel,
  ...args
}) => (
  <Checkbox onChange={console.log} {...args}>
    Beautiful checkbox
  </Checkbox>
)
