import { render, screen } from '@testing-library/react'
import { Expandable } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('Expandable', () => {
  test('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(<Expandable>Sample Expandable</Expandable>))

  test('renders correctly opened', () =>
    shouldMatchEmotionSnapshot(
      <Expandable opened>Sample Expandable</Expandable>,
    ))

  test('renders correctly with minHeight', () =>
    shouldMatchEmotionSnapshot(
      <Expandable minHeight={5}>Sample Expandable</Expandable>,
    ))

  test('renders correctly with className', () =>
    shouldMatchEmotionSnapshot(
      <Expandable className="test">Sample Expandable</Expandable>,
    ))

  test('should open the expandable', () => {
    jest.useFakeTimers()
    const { rerender } = render(
      <Expandable className="test" data-testid="expandable" minHeight={100}>
        Sample Expandable
      </Expandable>,
    )
    jest
      .spyOn(screen.getByTestId('expandable'), 'scrollHeight', 'get')
      .mockImplementation(() => 100)
    expect(screen.getByTestId('expandable')).toHaveStyle('max-height: 100px')
    expect(screen.getByTestId('expandable')).toHaveStyle('overflow: hidden')

    rerender(
      <Expandable
        className="test"
        data-testid="expandable"
        minHeight={100}
        opened
      >
        Sample Expandable
      </Expandable>,
    )
    jest.runAllTimers()
    expect(screen.getByTestId('expandable')).toHaveStyle('overflow: visible')
    expect(screen.getByTestId('expandable')).toHaveStyle('max-height: initial')
  })

  test('should close the expandable', () => {
    jest.useFakeTimers()
    const { rerender } = render(
      <Expandable
        className="test"
        data-testid="expandable"
        minHeight={100}
        opened
      >
        Sample Expandable
      </Expandable>,
    )
    jest
      .spyOn(screen.getByTestId('expandable'), 'scrollHeight', 'get')
      .mockImplementation(() => 100)
    expect(screen.getByTestId('expandable')).toHaveStyle('max-height: initial')
    expect(screen.getByTestId('expandable')).toHaveStyle('overflow: visible')

    rerender(
      <Expandable className="test" data-testid="expandable" minHeight={100}>
        Sample Expandable
      </Expandable>,
    )
    jest.runAllTimers()
    expect(screen.getByTestId('expandable')).toHaveStyle('overflow: hidden')
    expect(screen.getByTestId('expandable')).toHaveStyle('max-height: 100px')
  })
})
