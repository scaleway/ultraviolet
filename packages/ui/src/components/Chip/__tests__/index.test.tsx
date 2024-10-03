import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { Chip } from '..'

describe('Checkbox', () => {
  test('renders correctly', () => shouldMatchEmotionSnapshot(<Chip>test</Chip>))
  test('renders correctly wiht icon', () =>
    shouldMatchEmotionSnapshot(
      <Chip>
        test
        <Chip.Icon name="address" onClick={() => {}} />
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

  test('renders correctly onClick', async () => {
    const mockOnClick1 = vi.fn()
    const mockOnClick2 = vi.fn()
    const mockOnClickIcon1 = vi.fn()
    const mockOnClickIcon2 = vi.fn()

    renderWithTheme(
      <>
        <Chip onClick={mockOnClick1} data-testid="test">
          test
          <Chip.Icon
            name="arrowDown"
            onClick={mockOnClickIcon1}
            data-testid="test-icon"
          />
        </Chip>
        <Chip onClick={mockOnClick2} data-testid="test-disabled" disabled>
          test Disabled
          <Chip.Icon
            name="arrowDown"
            onClick={mockOnClickIcon2}
            data-testid="test-icon-disabled"
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
