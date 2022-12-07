import { ComponentStory } from '@storybook/react'
import Checkbox from '..'

export const Template: ComponentStory<typeof Checkbox> = ({
  'aria-label': ariaLabel,
  ...args
}) => (
  <Checkbox onChange={console.log} {...args}>
    Beautiful checkbox
  </Checkbox>
)
