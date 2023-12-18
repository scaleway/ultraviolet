import type { StoryFn } from '@storybook/react'
import type { TextAreaFieldProps } from '..'
import { TextAreaField } from '..'
import { Submit, TextInputField } from '../..'

export const Template: StoryFn<TextAreaFieldProps> = args => (
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
