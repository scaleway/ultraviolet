import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, it } from 'vitest'
import { Carousel } from '..'
import { renderWithTheme, shouldMatchSnapshot } from '../../../../__tests__/helpers'

describe('carousel', () => {
  it('renders correctly with default props', () =>
    shouldMatchSnapshot(
      <Carousel>
        <Carousel.Item>Item 1</Carousel.Item>
        <Carousel.Item>Item 2</Carousel.Item>
        <Carousel.Item>Item 3</Carousel.Item>
        <Carousel.Item>Item 4</Carousel.Item>
        <Carousel.Item>Item 5</Carousel.Item>
        <Carousel.Item>Item 6</Carousel.Item>
      </Carousel>,
    ))

  it('check hover state on scrollbar', async () => {
    renderWithTheme(
      <Carousel>
        <Carousel.Item>Item 1</Carousel.Item>
        <Carousel.Item>Item 2</Carousel.Item>
        <Carousel.Item>Item 3</Carousel.Item>
        <Carousel.Item>Item 4</Carousel.Item>
        <Carousel.Item>Item 5</Carousel.Item>
        <Carousel.Item>Item 6</Carousel.Item>
      </Carousel>,
    )

    const scrollbarBefore = screen.getByTestId<HTMLInputElement>('scrollbar-before')
    const scrollbarAfter = screen.getByTestId<HTMLInputElement>('scrollbar-after')
    await userEvent.hover(scrollbarBefore)
    await userEvent.hover(scrollbarAfter)
  })
})
