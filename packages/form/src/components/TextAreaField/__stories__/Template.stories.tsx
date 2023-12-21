import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { TextAreaField } from '..'
import { Submit, TextInputField } from '../..'

export const Template: StoryFn<ComponentProps<typeof TextAreaField>> = args => (
  <div>
    <TextAreaField {...args} />
    <TextInputField name="example" required regex={[/[a-z]+/]} />
    <Submit>Submit</Submit>
  </div>
)

Template.args = {
  label: 'Label',
  name: 'textarea',
  required: true,
}
