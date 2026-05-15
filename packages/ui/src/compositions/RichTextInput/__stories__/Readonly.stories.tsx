import { Template } from './Template.stories'

export const Readonly = Template.bind({})

Readonly.args = {
  ...Template.args,
  readOnly: true,
}

Readonly.parameters = {
  docs: {
    description: {
      story: 'Mark `RichTextInput` as disabled using `disabled` property.',
    },
  },
}
