import { Story } from '@storybook/react'
import { ComponentProps } from 'react'
import BarStack from '..'

const fakeData = [
  { id: '1', text: 'Hello', tooltip: 'Hello', value: 20 },
  { id: '2', text: 'Nice component', tooltip: 'Nice component', value: 42 },
  { id: '3', text: 'Encore', tooltip: 'Encore', value: 42 },
  { id: '4', text: 'Next', tooltip: 'Next', value: 42 },
  {
    id: '5',
    text: 'Next should be same as first',
    tooltip: 'Next should be same as first',
    value: 42,
  },
  { id: '6', text: 'Bye bye', tooltip: 'Bye bye', value: 42 },
]

const Template: Story<ComponentProps<typeof BarStack>> = args => (
  <BarStack {...args} />
)

export const Basic = Template.bind({})

Basic.args = {
  data: fakeData,
}

export const WithMax = Template.bind({})

WithMax.args = {
  data: fakeData,
  total: 500,
}

export default {
  component: BarStack,
  title: 'Components/Data Display/BarStack',
}
