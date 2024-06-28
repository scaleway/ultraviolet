import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { Slider } from '..'

describe('Double slider', () => {
  test.only('handles correctly onChange double', async () => {
    const onChange = () => vi.fn()

    const { asFragment } = renderWithTheme(
      <Slider
        name="slider"
        onChange={onChange}
        data-testid="slider"
        value={[1, 2]}
        double
        input
      />,
    )
    const sliderRight = screen.getByTestId<HTMLInputElement>('slider-right')
    const sliderLeft = screen.getByTestId<HTMLInputElement>('slider-left')

    fireEvent.change(sliderRight, { target: { value: '7' } })
    expect(sliderRight.value).toBe('7')

    fireEvent.change(sliderLeft, { target: { value: '3' } })
    expect(sliderLeft.value).toBe('3')

    const inputRight = screen.getByTestId('slider-input-right')
    await userEvent.type(inputRight, '5')
    expect(sliderRight.value).toBe('75')

    const inputLeft = screen.getByTestId('slider-input-left')
    await userEvent.type(inputLeft, '5')
    expect(sliderLeft.value).toBe('35')
    expect(asFragment()).toMatchSnapshot()
  })

  test('handles correctly onChange with min and max double', async () => {
    const onChange: (value: number[]) => void = vi.fn()

    const { asFragment } = renderWithTheme(
      <Slider
        name="slider"
        onChange={onChange}
        data-testid="slider"
        value={[3, 5]}
        input
        max={10}
        min={2}
        double
      />,
    )
    const sliderRight = screen.getByTestId<HTMLInputElement>('slider-right')
    const sliderLeft = screen.getByTestId<HTMLInputElement>('slider-left')

    const inputRight = screen.getByTestId('slider-input-right')
    await userEvent.type(inputRight, '5')
    await userEvent.tab()
    expect(sliderRight.value).toBe('10')

    const inputLeft = screen.getByTestId('slider-input-left')
    await userEvent.type(inputLeft, '5')
    await userEvent.tab()
    expect(sliderLeft.value).toBe('9')

    await userEvent.clear(inputLeft)
    await userEvent.tab()
    expect(sliderLeft.value).toBe('2')

    await userEvent.clear(inputRight)
    await userEvent.tab()
    expect(sliderRight.value).toBe('10')
    expect(asFragment()).toMatchSnapshot()
  })
})
