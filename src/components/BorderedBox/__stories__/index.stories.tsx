import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import BorderedBox from '..'

export default {
  component: BorderedBox,
  title: 'Components/Container/BorderedBox',
} as Meta

const Template: Story<ComponentProps<typeof BorderedBox>> = props => (
  <BorderedBox {...props}>Hello</BorderedBox>
)

export const Default = Template.bind({})
