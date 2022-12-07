import { Story } from '@storybook/react'
import Checkbox from '..'

export const Template: Story<Omit<typeof Checkbox, 'aria-label'>> = args => (
  <Checkbox onChange={console.log} {...args}>
    Beautiful checkbox
  </Checkbox>
)
