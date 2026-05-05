import { Template } from './Template.stories'

export const Rows = Template.bind({})

Rows.args = {
  ...Template.args,
  rows: 10,
  maxRows: 20,
}

Rows.parameters = {
  docs: {
    description: {
      story:
        'Set the number of rows for the `RichTextInput` using the `rows` and `maxRows` properties. When `maxRows` is set, the `RichTextInput` will automatically adjust its height based on the content until it reaches `maxRows`.',
    },
  },
}
