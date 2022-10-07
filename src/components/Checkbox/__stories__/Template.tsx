import { ComponentStory } from '@storybook/react'
import Checkbox from '..'

export const Template: ComponentStory<typeof Checkbox> = ({
  onChange = console.log,
  ...props
}) => (
  <Checkbox onChange={onChange} {...props}>
    Beautiful checkbox
  </Checkbox>
)
