import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { BarStack } from '..'

const fakeData = [
  { id: '1', text: 'Hello', value: 20 },
  { id: '2', value: 42 },
  { id: '3', text: 'Encore', value: 42 },
  { id: '4', text: 'Next', value: 42 },
  { id: '5', text: 'Bye bye', value: 42 },
]

describe('barStack', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithTheme(<BarStack data={fakeData} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with total', () => {
    const { asFragment } = renderWithTheme(
      <BarStack data={fakeData} total={1000} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with event handlers', async () => {
    const [
      onClick,
      onDoubleClick,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onMouseUp,
    ] = new Array(6).fill(1).map(() => vi.fn())

    const { asFragment } = renderWithTheme(
      <BarStack
        data={[
          {
            id: '1',
            onClick,
            onDoubleClick,
            onMouseDown,
            onMouseEnter,
            onMouseLeave,
            onMouseUp,
            text: 'Hello',
            value: 100,
          },
        ]}
      />,
    )
    const helloDiv = screen.getByText('Hello')
    await userEvent.click(helloDiv)
    expect(onClick).toBeCalledTimes(1)
    expect(onMouseEnter).toBeCalledTimes(1)
    expect(onMouseDown).toBeCalledTimes(1)
    expect(onMouseUp).toBeCalledTimes(1)
    expect(onDoubleClick).toBeCalledTimes(0)
    expect(onMouseLeave).toBeCalledTimes(0)
    await userEvent.dblClick(helloDiv)
    expect(onDoubleClick).toBeCalledTimes(1)
    expect(onClick).toBeCalledTimes(3)
    await userEvent.unhover(helloDiv)
    expect(onMouseLeave).toBeCalledTimes(1)

    expect(asFragment()).toMatchSnapshot()
  })
})
