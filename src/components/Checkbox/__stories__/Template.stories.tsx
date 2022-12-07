import { ComponentStory } from '@storybook/react'
import Checkbox from '..'

export const Template: ComponentStory<typeof Checkbox> = () => (
  <Checkbox onChange={console.log}>Beautiful checkbox</Checkbox>
)
