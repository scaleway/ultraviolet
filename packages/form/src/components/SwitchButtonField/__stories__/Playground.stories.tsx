import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  leftButton: {
    label: 'Left Button Label',
    value: 'left',
  },
  rightButton: {
    label: 'Right Button Label',
    value: 'right',
  },
  name: 'switchButton',
}
