import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { Chip } from '..'

describe('checkbox', () => {
  test('renders correctly', () => shouldMatchEmotionSnapshot(<Chip>test</Chip>))
  test('renders correctly wiht icon', () =>
    shouldMatchEmotionSnapshot(
      <Chip>
        <Chip.Icon name="address" onClick={() => {}} />
        test
      </Chip>,
    ))

  test('renders correctly active', () =>
    shouldMatchEmotionSnapshot(
      <Chip active>
        test <Chip.Icon name="address" />
      </Chip>,
    ))

  test('renders correctly large', () =>
    shouldMatchEmotionSnapshot(
      <Chip size="large">
        test <Chip.Icon name="address" />
      </Chip>,
    ))

  test('renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(
      <Chip disabled>
        test <Chip.Icon name="address" />
      </Chip>,
    ))

  test('renders correctly active disabled', () =>
    shouldMatchEmotionSnapshot(
      <Chip active disabled>
        test <Chip.Icon name="address" />
      </Chip>,
    ))

  test('throw error when using Chip.Icon outside of Chip', () => {
    expect(() => renderWithTheme(<Chip.Icon name="address" />)).toThrowError(
      'Chip.Icon can only be used inside a Chip component',
    )
  })

  test('renders correctly onClick', async () => {
    const mockOnClick1 = vi.fn()
    const mockOnClick2 = vi.fn()
    const mockOnClickIcon1 = vi.fn()
    const mockOnClickIcon2 = vi.fn()

    renderWithTheme(
      <>
        <Chip data-testid="test" onClick={mockOnClick1}>
          test
          <Chip.Icon
            data-testid="test-icon"
            name="arrowDown"
            onClick={mockOnClickIcon1}
          />
        </Chip>
        <Chip data-testid="test-disabled" disabled onClick={mockOnClick2}>
          test Disabled
          <Chip.Icon
            data-testid="test-icon-disabled"
            name="arrowDown"
            onClick={mockOnClickIcon2}
          />
        </Chip>
      </>,
    )

    const chip = screen.getByTestId('test')
    await userEvent.click(chip)
    expect(mockOnClick1).toHaveBeenCalledOnce()

    const chipDisabled = screen.getByTestId('test-disabled')
    await userEvent.click(chipDisabled)
    expect(mockOnClick2).toHaveBeenCalledTimes(0)

    const chipIcon = screen.getByTestId('test-icon')
    await userEvent.click(chipIcon)
    expect(mockOnClickIcon1).toHaveBeenCalledOnce()

    const chipIconDisabled = screen.getByTestId('test-icon-disabled')
    await userEvent.click(chipIconDisabled)
    expect(mockOnClickIcon2).toHaveBeenCalledTimes(0)
  })
})
