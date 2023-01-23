import type { ComponentStory } from '@storybook/react'
import { Carousel } from '..'

export const Template: ComponentStory<typeof Carousel> = props => (
  <Carousel {...props}>
    <Carousel.Item>Item 1</Carousel.Item>
    <Carousel.Item>Item 2</Carousel.Item>
    <Carousel.Item>Item 3</Carousel.Item>
    <Carousel.Item>Item 4</Carousel.Item>
    <Carousel.Item>Item 5</Carousel.Item>
    <Carousel.Item>Item 6</Carousel.Item>
  </Carousel>
)
