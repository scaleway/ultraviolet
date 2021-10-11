import { Story } from '@storybook/react'
import React from 'react'
import BarStack, { BarStackProps } from '..'

const fakeData = [
  { id: '1', text: 'Hello', value: 20 },
  { id: '2', text: 'Nice component', value: 42 },
  { id: '3', text: 'Encore', value: 42 },
  { id: '4', text: 'Next', value: 42 },
  { id: '5', text: 'Next should be same as first', value: 42 },
  { id: '6', text: 'Bye bye', value: 42 },
]

const Template: Story<BarStackProps> = ({ data }) => <BarStack data={data} />

export const Basic = Template.bind({})

Basic.args = {
  data: fakeData,
}

export default {
  component: BarStack,
  title: 'Components/Data Display/BarStack',
}
