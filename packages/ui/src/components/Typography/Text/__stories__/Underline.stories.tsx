import { Template } from './Template.stories'

export const Underline = Template.bind({})
Underline.args = {
  as: 'p',
  children: 'This is a paragraph text',
  underline: true,
  variant: 'body',
}
Underline.parameters = {
  docs: {
    description: {
      story: 'Set text style to be underline using `underline`',
    },
  },
}
