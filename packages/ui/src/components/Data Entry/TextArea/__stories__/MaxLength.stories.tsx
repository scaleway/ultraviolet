import { Template } from './Template.stories'

export const MaxLength = Template.bind({})

MaxLength.args = {
  ...Template.args,
  maxLength: 20,
}

MaxLength.parameters = {
  docs: {
    description: {
      story:
        'You can specify a `maxLength` to the text area. In addition of the `textarea` html behavior, it automatically add a character counter.',
    },
  },
}
