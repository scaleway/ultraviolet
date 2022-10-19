import { Template } from './Template.stories'

export const Italic = Template.bind({})
Italic.args = {
  as: 'p',
  children: 'This is a paragraph text',
  italic: true,
  variant: 'body',
}
Italic.parameters = {
  docs: {
    description: {
      story: 'Set text style to be italic using `italic`',
    },
  },
}
