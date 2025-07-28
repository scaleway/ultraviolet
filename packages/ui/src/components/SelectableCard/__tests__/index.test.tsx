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
            label="test"
            name="test"
            onChange={() => {}}
            value="choice"
          >
            Radio card
          </SelectableCard>,
        ))

      test('renders correctly with aria label', () =>
        shouldMatchEmotionSnapshot(
          <SelectableCard
            aria-label="test"
            name="test"
            onChange={() => {}}
            value="choice"
          >
            Radio card
          </SelectableCard>,
        ))

      test('renders correctly with showTick', () =>
        shouldMatchEmotionSnapshot(
          <SelectableCard
            aria-label="test"
            name="test"
            onChange={() => {}}
            showTick
            type={type}
            value="choice"
          >
            Checkbox card
          </SelectableCard>,
        ))

      test('renders correctly with checked prop', () =>
        shouldMatchEmotionSnapshot(
          <SelectableCard
            aria-label="test"
            checked
            name="test"
            onChange={() => {}}
            type={type}
            value="choice"
          >
            Radio card
          </SelectableCard>,
        ))

      test('renders correctly with disabled prop', () =>
        shouldMatchEmotionSnapshot(
          <SelectableCard
            aria-label="test"
            disabled
            name="test"
            onChange={() => {}}
            type={type}
            value="choice"
          >
            Radio card
          </SelectableCard>,
        ))

      test('renders correctly with isError prop', () =>
        shouldMatchEmotionSnapshot(
          <SelectableCard
            isError
            label="test"
            name="test"
            onChange={() => {}}
            type={type}
            value="choice"
          >
            Radio card
          </SelectableCard>,
        ))

      test('renders correctly with tooltip prop', () =>
        shouldMatchEmotionSnapshot(
          <SelectableCard
            label="test"
            name="test"
            onChange={() => {}}
            tooltip="test"
            type={type}
            value="choice"
          >
            Checkbox card
          </SelectableCard>,
        ))

      test('renders correctly with complex children', () =>
        shouldMatchEmotionSnapshot(
          <SelectableCard
            disabled
            label="test"
            name="test"
            onChange={() => {}}
            type={type}
            value="choice"
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
            illustration={illustration}
            label="label"
            name="label-14"
            onChange={() => {}}
            showTick
            type={type}
            value="label-14"
          >
            Offer the best experience to your Mac, iPhone and iPad users with
            VNC, the remote desktop-sharing protocol. Learn more
          </SelectableCard>,
        ))

      test('renders correctly with productIcon', () =>
        shouldMatchEmotionSnapshot(
          <SelectableCard
            label="label"
            name="label-14"
            onChange={() => {}}
            productIcon="macMini"
            showTick
            type={type}
            value="label-14"
          >
            Offer the best experience to your Mac, iPhone and iPad users with
            VNC, the remote desktop-sharing protocol. Learn more
          </SelectableCard>,
        ))

      test('accessibility working with space key pressed to select', async () => {
        const onChange = vi.fn()

        renderWithTheme(
          <SelectableCard
            label="test"
            name="test"
            onChange={onChange}
            type={type}
            value="choice"
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

      test(`should trigger onChange when click on the label using getByLabelText`, async () => {
        const onChange = vi.fn()

        renderWithTheme(
          <SelectableCard
            label="test"
            name="test"
            onChange={onChange}
            type={type}
            value="choice"
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

      test(`should trigger onChange when click on the label using getByRole`, async () => {
        const onChange = vi.fn()

        renderWithTheme(
          <SelectableCard
            label="test"
            name="test"
            onChange={onChange}
            type={type}
            value="choice"
          >
            {`${type.charAt(0).toUpperCase() + type.slice(1)} card`}
          </SelectableCard>,
        )

        const label = screen.getByRole(type, { name: 'test' })
        await userEvent.click(label)

        await waitFor(() => {
          expect(onChange).toHaveBeenCalled()
        })
      })

      test(`should trigger onChange when click on the card`, async () => {
        const onChange = vi.fn()

        renderWithTheme(
          <SelectableCard
            label="test"
            name="test"
            onChange={onChange}
            type={type}
            value="choice"
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
