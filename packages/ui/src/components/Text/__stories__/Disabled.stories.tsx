import { Template } from './Template.stories'

export const Disabled = Template.bind({})
Disabled.args = {
  as: 'div',
  children: 'This is a basic Text',
  disabled: true,
  variant: 'body',
}
