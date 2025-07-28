import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  children: 'This is an alert content.',
  sentiment: 'info',
  title: 'Alert',
}
