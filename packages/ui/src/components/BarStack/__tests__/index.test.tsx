import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { BarStack } from '..'

const fakeData = [
  { id: '1', text: 'Hello', tooltip: 'tooltip', value: 20 },
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
  test('should render correctly with label and label information', () => {
    const { asFragment } = renderWithTheme(
      <BarStack
        className="classname"
        data={fakeData}
        label="label"
        labelInformation="label information"
        total={1000}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  Object.keys(['xsmall', 'small', 'large', 'medium']).forEach(size => {
    test(`renders correctly size ${size}`, () => {
      const { asFragment } = renderWithTheme(<BarStack data={fakeData} />)
      expect(asFragment()).toMatchSnapshot()
    })
  })

  test('should render correctly with legend outside', () => {
    const { asFragment } = renderWithTheme(
      <BarStack data={fakeData} legend="outside" total={1000} />,
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
    expect(onClick).toHaveBeenCalledOnce()
    expect(onMouseEnter).toHaveBeenCalledOnce()
    expect(onMouseDown).toHaveBeenCalledOnce()
    expect(onMouseUp).toHaveBeenCalledOnce()
    expect(onDoubleClick).toBeCalledTimes(0)
    expect(onMouseLeave).toBeCalledTimes(0)
    await userEvent.dblClick(helloDiv)
    expect(onDoubleClick).toHaveBeenCalledOnce()
    expect(onClick).toBeCalledTimes(3)
    await userEvent.unhover(helloDiv)
    expect(onMouseLeave).toHaveBeenCalledOnce()

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with hovering legend', async () => {
    const { asFragment } = renderWithTheme(
      <BarStack
        data={[
          {
            id: '1',
            text: 'Hello',
            tooltip: 'tooltip',
            value: 100,
          },
        ]}
        legend="outside"
      />,
    )
    const legend = screen.getByTestId('legend-1')
    const content = screen.getByTestId('content-1')

    await userEvent.hover(legend)
    await userEvent.unhover(legend)
    await userEvent.hover(content)
    await userEvent.unhover(content)

    expect(asFragment()).toMatchSnapshot()
  })
})
