import { act, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { SelectableCard } from '..'
import illustration from './illustrationTest.svg'

describe('SelectableCard', () => {
  const types = ['radio', 'checkbox'] as const

  types.forEach(type => {
    describe(`${type}`, () => {
      test('renders correctly with default props', () =>
        shouldMatchEmotionSnapshot(
          <SelectableCard
            onChange={() => {}}
            name="test"
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
            name="test"
            value="choice"
            aria-label="test"
          >
            Radio card
          </SelectableCard>,
        ))

      test('renders correctly with showTick', () =>
        shouldMatchEmotionSnapshot(
          <SelectableCard
            onChange={() => {}}
            name="test"
            value="choice"
            type={type}
            aria-label="test"
            showTick
          >
            Checkbox card
          </SelectableCard>,
        ))

      test('renders correctly with checked prop', () =>
        shouldMatchEmotionSnapshot(
          <SelectableCard
            onChange={() => {}}
            name="test"
            type={type}
            aria-label="test"
            value="choice"
            checked
          >
            Radio card
          </SelectableCard>,
        ))

      test('renders correctly with disabled prop', () =>
        shouldMatchEmotionSnapshot(
          <SelectableCard
            onChange={() => {}}
            name="test"
            type={type}
            aria-label="test"
            value="choice"
            disabled
          >
            Radio card
          </SelectableCard>,
        ))

      test('renders correctly with isError prop', () =>
        shouldMatchEmotionSnapshot(
          <SelectableCard
            onChange={() => {}}
            name="test"
            label="test"
            type={type}
            value="choice"
            isError
          >
            Radio card
          </SelectableCard>,
        ))

      test('renders correctly with tooltip prop', () =>
        shouldMatchEmotionSnapshot(
          <SelectableCard
            onChange={() => {}}
            name="test"
            type={type}
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
            name="test"
            label="test"
            type={type}
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

      test('renders correctly with illustration', () =>
        shouldMatchEmotionSnapshot(
          <SelectableCard
            name="label-14"
            value="label-14"
            type={type}
            label="label"
            showTick
            onChange={() => {}}
            illustration={illustration}
          >
            Offer the best experience to your Mac, iPhone and iPad users with
            VNC, the remote desktop-sharing protocol. Learn more
          </SelectableCard>,
        ))

      test('renders correctly with productIcon', () =>
        shouldMatchEmotionSnapshot(
          <SelectableCard
            name="label-14"
            value="label-14"
            type={type}
            label="label"
            productIcon="macMini"
            showTick
            onChange={() => {}}
          >
            Offer the best experience to your Mac, iPhone and iPad users with
            VNC, the remote desktop-sharing protocol. Learn more
          </SelectableCard>,
        ))

      test('accessibility working with space key pressed to select', async () => {
        const onChange = vi.fn()

        renderWithTheme(
          <SelectableCard
            onChange={onChange}
            value="choice"
            label="test"
            type={type}
            name="test"
          >
            {`${type.charAt(0).toUpperCase() + type.slice(1)} card`}
          </SelectableCard>,
        )

        const button = screen.getByRole('button')
        act(() => button.focus())

        await userEvent.keyboard('[Space]')
        await waitFor(() => {
          expect(onChange).toHaveBeenCalled()
        })
      })

      test(`should trigger onChange when click on the label`, async () => {
        const onChange = vi.fn()

        renderWithTheme(
          <SelectableCard
            onChange={onChange}
            type={type}
            value="choice"
            label="test"
            name="test"
          >
            {`${type.charAt(0).toUpperCase() + type.slice(1)} card`}
          </SelectableCard>,
        )

        const label = screen.getByLabelText('test')
        await userEvent.click(label)

        await waitFor(() => {
          expect(onChange).toHaveBeenCalled()
        })
      })

      test(`should trigger onChange when click on the card`, async () => {
        const onChange = vi.fn()

        renderWithTheme(
          <SelectableCard
            onChange={onChange}
            type={type}
            value="choice"
            label="test"
            name="test"
          >
            {`${type.charAt(0).toUpperCase() + type.slice(1)} card`}
          </SelectableCard>,
        )

        const card = screen.getByRole('button')
        await userEvent.click(card)

        await waitFor(() => {
          expect(onChange).toHaveBeenCalled()
        })
      })
    })
  })
})
