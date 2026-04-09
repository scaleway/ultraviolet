import { Template } from './Template.stories'

export const Error = Template.bind({})

Error.args = {
  ...Template.args,
  error: 'value is invalid',
}

Error.parameters = {
  docs: {
    description: {
      story:
        'Mark `RichTextEditor` in an error state using `error` string property. Any helper will be replaced by provided error message',
    },
  },
}
