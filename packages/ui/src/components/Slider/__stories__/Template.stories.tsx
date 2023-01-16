import type { ComponentStory } from '@storybook/react'
import { Slider } from '..'

export const Template: ComponentStory<typeof Slider> = props => (
  <Slider {...props}>
    <Slider.Item>Item 1</Slider.Item>
    <Slider.Item>Item 2</Slider.Item>
    <Slider.Item>Item 3</Slider.Item>
    <Slider.Item>Item 4</Slider.Item>
    <Slider.Item>Item 5</Slider.Item>
    <Slider.Item>Item 6</Slider.Item>
  </Slider>
)
