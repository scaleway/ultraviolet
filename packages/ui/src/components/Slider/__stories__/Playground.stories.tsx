import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  ...Template.args,
  helper:
    'Helper is an accessible way to provide additional information that might help the user',
}
