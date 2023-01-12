import { act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Slider from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../../.jest/helpers'

describe('Slider', () => {
  test(`renders correctly with default props`, () =>
    shouldMatchEmotionSnapshot(
      <Slider>
        <Slider.Item>Item 1</Slider.Item>
        <Slider.Item>Item 2</Slider.Item>
        <Slider.Item>Item 3</Slider.Item>
        <Slider.Item>Item 4</Slider.Item>
        <Slider.Item>Item 5</Slider.Item>
        <Slider.Item>Item 6</Slider.Item>
      </Slider>,
    ))

  test(`handles scroll`, async () => {
    const container = renderWithTheme(
      <Slider>
        <Slider.Item>Item 1</Slider.Item>
        <Slider.Item>Item 2</Slider.Item>
        <Slider.Item>Item 3</Slider.Item>
        <Slider.Item>Item 4</Slider.Item>
        <Slider.Item>Item 5</Slider.Item>
        <Slider.Item>Item 6</Slider.Item>
      </Slider>,
    )

    const scrollbarBefore = container.getByTestId(
      'scrollbar-before',
    ) as HTMLInputElement
    const scrollbarAfter = container.getByTestId(
      'scrollbar-after',
    ) as HTMLInputElement
    await act(async () => {
      await userEvent.hover(scrollbarBefore)
      await userEvent.hover(scrollbarAfter)
    })
  })
})
