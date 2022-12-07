import { fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Checkbox from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../helpers/jestHelpers'

describe('Checkbox', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <Checkbox
        onBlur={() => {}}
        onFocus={() => {}}
        onChange={() => {}}
        name="testing"
      >
        Checkbox Label
      </Checkbox>,
    ))

  test('renders correctly no child', () =>
    shouldMatchEmotionSnapshot(
      <Checkbox aria-label="check" onChange={() => {}} />,
    ))

  test('renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(
      <Checkbox onChange={() => {}} disabled>
        Checkbox Label
      </Checkbox>,
    ))

  test('renders correctly checked', () =>
    shouldMatchEmotionSnapshot(
      <Checkbox onChange={() => {}} checked>
        Checkbox Label
      </Checkbox>,
    ))

  test('renders correctly indeterminate', () =>
    shouldMatchEmotionSnapshot(
      <Checkbox onChange={() => {}} checked="indeterminate">
        Checkbox Label
      </Checkbox>,
    ))

  test('renders correctly checked and disabled', () =>
    shouldMatchEmotionSnapshot(
      <Checkbox onChange={() => {}} checked disabled>
        Checkbox Label
      </Checkbox>,
    ))

  test('renders correctly indeterminate and disabled', () =>
    shouldMatchEmotionSnapshot(
      <Checkbox onChange={() => {}} checked="indeterminate" disabled>
        Checkbox Label
      </Checkbox>,
    ))

  test('renders correctly invisible', () =>
    shouldMatchEmotionSnapshot(
      <Checkbox onChange={() => {}} data-visibility="true">
        Checkbox Label
      </Checkbox>,
    ))

  test('renders correctly with an error', () =>
    shouldMatchEmotionSnapshot(
      <Checkbox onChange={() => {}} error="test error">
        Checkbox Label
      </Checkbox>,
    ))

  test('renders correctly with progress', () =>
    shouldMatchEmotionSnapshot(
      <Checkbox onChange={() => {}} progress>
        Checkbox Label
      </Checkbox>,
    ))

  test('renders correctly with progress and no child', () =>
    shouldMatchEmotionSnapshot(
      <Checkbox aria-label="check" onChange={() => {}} progress />,
    ))

  test('renders correctly with a value', () =>
    shouldMatchEmotionSnapshot(
      <Checkbox onChange={() => {}} value="test">
        Checkbox Label
      </Checkbox>,
    ))

  test('renders correctly with sizes', () =>
    shouldMatchEmotionSnapshot(
      <>
        <Checkbox onChange={() => {}} size={37} value="test">
          Checkbox Label
        </Checkbox>
        <Checkbox onChange={() => {}} progress size={37} value="test">
          Checkbox Label
        </Checkbox>
      </>,
    ))

  test('renders correctly with indeterminate state', () =>
    shouldMatchEmotionSnapshot(
      <Checkbox onChange={() => {}} checked="indeterminate">
        Checkbox Label
      </Checkbox>,
    ))

  test('renders with click event', async () => {
    const node = renderWithTheme(
      <Checkbox onChange={() => {}} size={37} value="test">
        Checkbox Label
      </Checkbox>,
    )

    const input = node.getByRole('checkbox', {
      hidden: true,
    }) as HTMLInputElement
    await userEvent.click(input)
    expect(input.checked).toBe(true)
  })

  test('renders with click event with progress', async () => {
    const node = renderWithTheme(
      <Checkbox onChange={() => {}} size={37} value="test" progress>
        Checkbox Label
      </Checkbox>,
    )

    const input = node.getByRole('checkbox', {
      hidden: true,
    }) as HTMLInputElement
    await userEvent.click(input)
    expect(input.checked).toBe(true)
  })

  test('check checkbox with space key for a11y', async () => {
    const node = renderWithTheme(
      <Checkbox onChange={() => {}} value="test">
        Checkbox Label
      </Checkbox>,
    )

    const input = node.getByRole('checkbox', {
      hidden: true,
    }) as HTMLInputElement

    input.focus()
    expect(input).toHaveFocus()
    fireEvent.keyDown(input, { charCode: 32, code: 'Space', key: ' ' })
    await waitFor(() => expect(input.checked).toBe(true))
  })

  test('shoudld not check checkbox with key A', async () => {
    const node = renderWithTheme(
      <Checkbox onChange={() => {}} value="test">
        Checkbox Label
      </Checkbox>,
    )

    const input = node.getByRole('checkbox', {
      hidden: true,
    }) as HTMLInputElement

    input.focus()
    fireEvent.keyDown(input, { charCode: 65, code: 'KeyA', key: 'a' })
    await waitFor(() => expect(input.checked).toBe(false))
  })
})
