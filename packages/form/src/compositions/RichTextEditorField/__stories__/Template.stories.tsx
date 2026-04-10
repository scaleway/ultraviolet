import { RichTextEditorField } from '..'
import { Submit } from '../../../components'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Template: StoryFn<
  ComponentProps<typeof RichTextEditorField>
> = args => (
  <div>
    <RichTextEditorField {...args} />
    <Submit>Submit</Submit>
  </div>
)

Template.args = {
  label: 'Label',
  name: 'richTextEditor',
}
