import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Dot from '..'

export default {
  component: Dot,
  title: 'Components/Data Display/Dot',
} as Meta

const Template: Story<ComponentProps<typeof Dot>> = args => <Dot {...args} />

export const Default = Template.bind({})

export const Color = Template.bind({})
Color.parameters = {
  docs: {
    storyDescription: 'Customize the style of the dot with `color` prop.',
  },
}
Color.decorators = [
  () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Dot color="primary" />
      <Dot color="success" />
      <Dot color="warning" />
      <Dot color="info" />
    </div>
  ),
]
