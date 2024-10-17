import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test, vi } from 'vitest'
import { SelectableCard } from '..'
import illustration from './illustrationTest.svg'

describe('SelectableCard', () => {
  test('renders correctly with default props', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="radio"
        value="choice"
        label="test"
      >
        Radio card
      </SelectableCard>,
    ))

  test('renders correctly with aria label', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="radio"
        value="choice"
        aria-label="test"
      >
        Radio card
      </SelectableCard>,
    ))

  test('renders correctly with checkbox type', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="checkbox"
        value="choice"
        type="checkbox"
        aria-label="test"
      >
        Checkbox card
      </SelectableCard>,
    ))

  test('renders correctly with showTick and type radio', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="checkbox"
        value="choice"
        type="radio"
        aria-label="test"
        showTick
      >
        Checkbox card
      </SelectableCard>,
    ))

  test('renders correctly with showTick and type checkbox', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="checkbox"
        value="choice"
        type="checkbox"
        showTick
        aria-label="test"
      >
        Checkbox card
      </SelectableCard>,
    ))

  test('renders correctly with radio type and checked prop', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="radio"
        type="radio"
        value="choice"
        aria-label="test"
        checked
      >
        Radio card
      </SelectableCard>,
    ))

  test('renders correctly with checkbox type and checked prop', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="radio"
        type="checkbox"
        aria-label="test"
        value="choice"
        checked
      >
        Radio card
      </SelectableCard>,
    ))

  test('renders correctly with radio type and disabled prop', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="radio"
        type="radio"
        aria-label="test"
        value="choice"
        disabled
      >
        Radio card
      </SelectableCard>,
    ))

  test('renders correctly with checkbox type and disabled prop', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="radio"
        type="checkbox"
        aria-label="test"
        value="choice"
        disabled
      >
        Radio card
      </SelectableCard>,
    ))

  test('renders correctly with checkbox type and isError prop', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="radio"
        label="test"
        type="checkbox"
        value="choice"
        isError
      >
        Radio card
      </SelectableCard>,
    ))

  test('renders correctly with radio type and isError prop', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="radio"
        type="radio"
        value="choice"
        label="test"
        isError
      >
        Radio card
      </SelectableCard>,
    ))

  test('renders correctly with radio type and tooltip prop', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="radio"
        type="radio"
        value="choice"
        label="test"
        tooltip="test"
      >
        Radio card
      </SelectableCard>,
    ))

  test('renders correctly with checkbox type and tooltip prop', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="checkbox"
        type="checkbox"
        label="test"
        value="choice"
        tooltip="test"
      >
        Checkbox card
      </SelectableCard>,
    ))

  test('renders correctly with complex children', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="radio"
        label="test"
        type="checkbox"
        value="choice"
        disabled
      >
        {({ checked, disabled }) => (
          <div
            style={{
              background: disabled ? 'gray' : 'green',
              color: checked ? 'green' : 'gray',
            }}
          >
            Complex radio card
          </div>
        )}
      </SelectableCard>,
    ))

  test('accessibility working with space key pressed to select', async () => {
    const onChange = vi.fn()

    renderWithTheme(
      <SelectableCard
        onChange={onChange}
        name="radio"
        value="choice"
        label="test"
      >
        Radio card
      </SelectableCard>,
    )

    const button = screen.getByRole('button')
    act(() => button.focus())

    await userEvent.keyboard('{Space}')
  })

  test('renders correctly with illustration', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        name="label-14"
        value="label-14"
        type="radio"
        label="label"
        showTick
        onChange={() => {}}
        illustration={illustration}
      >
        Offer the best experience to your Mac, iPhone and iPad users with VNC,
        the remote desktop-sharing protocol. Learn more
      </SelectableCard>,
    ))
  test('renders correctly with productIcon', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        name="label-14"
        value="label-14"
        type="radio"
        label="label"
        productIcon="macMini"
        showTick
        onChange={() => {}}
      >
        Offer the best experience to your Mac, iPhone and iPad users with VNC,
        the remote desktop-sharing protocol. Learn more
      </SelectableCard>,
    ))
})
