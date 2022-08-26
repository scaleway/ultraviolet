import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import SwitchButton from '..'

export default {
  component: SwitchButton,
  title: 'Components/Data Entry/SwitchButton',
} as Meta

const Template: Story<ComponentProps<typeof SwitchButton>> = args => (
  <SwitchButton {...args} />
)

export const Default = Template.bind({})
Default.args = {
  leftButton: {
    label: 'Left',
    value: 'left',
  },
  rightButton: {
    label: 'Right',
    value: 'right',
  },
  value: 'left',
}
