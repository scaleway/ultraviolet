import type { StoryFn } from '@storybook/react'
import { Carousel } from '..'

export const Template: StoryFn<typeof Carousel> = props => (
  <Carousel {...props}>
    <Carousel.Item>Item 1</Carousel.Item>
    <Carousel.Item>Item 2</Carousel.Item>
    <Carousel.Item>Item 3</Carousel.Item>
    <Carousel.Item>Item 4</Carousel.Item>
    <Carousel.Item>Item 5</Carousel.Item>
    <Carousel.Item>Item 6</Carousel.Item>
  </Carousel>
)
