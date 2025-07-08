import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { useReducer } from 'react'
import type { ActionDispatch } from 'react'
import { describe, expect, test } from 'vitest'
import { Checkbox } from '..'

type ChildrenProps = { checked: boolean; onChange: ActionDispatch<[]> }
type Props = {
  defaultChecked?: boolean
  children: (options: ChildrenProps) => React.ReactNode
}

describe('Checkbox', () => {
  const LocalControlValue = ({ defaultChecked = false, children }: Props) => {
    const [checked, setCheked] = useReducer(check => !check, defaultChecked)

    return children({ checked, onChange: setCheked })
  }

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

  test('renders correctly required', () =>
    shouldMatchEmotionSnapshot(
      <Checkbox onChange={() => {}} required>
        Checkbox Label
      </Checkbox>,
    ))

  test('renders correctly with tooltip', () =>
    shouldMatchEmotionSnapshot(
      <Checkbox onChange={() => {}} tooltip="test">
        Checkbox Label
      </Checkbox>,
    ))

  test('renders correctly checked', () =>
    shouldMatchEmotionSnapshot(
      <Checkbox onChange={() => {}} checked>
        Checkbox Label
      </Checkbox>,
    ))
  test('renders correctly checked with helper', () =>
    shouldMatchEmotionSnapshot(
      <Checkbox onChange={() => {}} checked helper="helper">
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

  test('renders correctly with a value', () =>
    shouldMatchEmotionSnapshot(
      <Checkbox onChange={() => {}} value="test">
        Checkbox Label
      </Checkbox>,
    ))

  test('renders correctly with indeterminate state', () =>
    shouldMatchEmotionSnapshot(
      <Checkbox onChange={() => {}} checked="indeterminate">
        Checkbox Label
      </Checkbox>,
    ))

  test('renders with click event', async () => {
    renderWithTheme(
      <LocalControlValue>
        {({ checked, onChange }) => (
          <Checkbox onChange={onChange} checked={checked} value="test">
            Checkbox Label
          </Checkbox>
        )}
      </LocalControlValue>,
    )

    const input = screen.getByRole<HTMLInputElement>('checkbox', {
      hidden: true,
    })
    await userEvent.click(input)
    expect(input.checked).toBeTruthy()
  })
})
