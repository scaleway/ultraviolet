import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Slider, { SliderItem } from '..'

export default {
  component: Slider,
  parameters: {
    docs: {
      description: {
        component:
          'Display an horizontal scroll bar with multiple boxed children inside of it.',
      },
    },
  },
  subcomponents: { SliderItem },
  title: 'Components/Data Display/Slider',
} as Meta

const Template: Story<ComponentProps<typeof Slider>> = () => (
  <Slider>
    <Slider.Item>Item 1</Slider.Item>
    <Slider.Item>Item 2</Slider.Item>
    <Slider.Item>Item 3</Slider.Item>
    <Slider.Item>Item 4</Slider.Item>
    <Slider.Item>Item 5</Slider.Item>
    <Slider.Item>Item 6</Slider.Item>
  </Slider>
)

export const Default = Template.bind({})
