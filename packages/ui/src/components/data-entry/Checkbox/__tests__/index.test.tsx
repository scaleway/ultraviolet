import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { useReducer } from 'react'
import type { ActionDispatch } from 'react'
import { describe, expect, it } from 'vitest'
import { Checkbox } from '..'

type ChildrenProps = { checked: boolean; onChange: ActionDispatch<[]> }
type Props = {
  defaultChecked?: boolean
  children: (options: ChildrenProps) => React.ReactNode
}

describe('checkbox', () => {
  const LocalControlValue = ({ defaultChecked = false, children }: Props) => {
    const [checked, setCheked] = useReducer(check => !check, defaultChecked)

    return children({ checked, onChange: setCheked })
  }

  it('renders correctly', () =>
    shouldMatchSnapshot(
      <Checkbox name="testing" onBlur={() => {}} onChange={() => {}} onFocus={() => {}}>
        Checkbox Label
      </Checkbox>,
    ))

  it('renders correctly no child', () => shouldMatchSnapshot(<Checkbox aria-label="check" onChange={() => {}} />))

  it('renders correctly disabled', () =>
    shouldMatchSnapshot(
      <Checkbox disabled onChange={() => {}}>
        Checkbox Label
      </Checkbox>,
    ))

  it('renders correctly required', () =>
    shouldMatchSnapshot(
      <Checkbox onChange={() => {}} required>
        Checkbox Label
      </Checkbox>,
    ))

  it('renders correctly with tooltip', () =>
    shouldMatchSnapshot(
      <Checkbox onChange={() => {}} tooltip="test">
        Checkbox Label
      </Checkbox>,
    ))

  it('renders correctly checked', () =>
    shouldMatchSnapshot(
      <Checkbox checked onChange={() => {}}>
        Checkbox Label
      </Checkbox>,
    ))
  it('renders correctly checked with helper', () =>
    shouldMatchSnapshot(
      <Checkbox checked helper="helper" onChange={() => {}}>
        Checkbox Label
      </Checkbox>,
    ))

  it('renders correctly indeterminate', () =>
    shouldMatchSnapshot(
      <Checkbox checked="indeterminate" onChange={() => {}}>
        Checkbox Label
      </Checkbox>,
    ))

  it('renders correctly small', () =>
    shouldMatchSnapshot(
      <Checkbox onChange={() => {}} size="small">
        Checkbox Label
      </Checkbox>,
    ))

  it('renders correctly checked and disabled', () =>
    shouldMatchSnapshot(
      <Checkbox checked disabled onChange={() => {}}>
        Checkbox Label
      </Checkbox>,
    ))

  it('renders correctly indeterminate and disabled', () =>
    shouldMatchSnapshot(
      <Checkbox checked="indeterminate" disabled onChange={() => {}}>
        Checkbox Label
      </Checkbox>,
    ))

  it('renders correctly invisible', () =>
    shouldMatchSnapshot(
      <Checkbox data-visibility="true" onChange={() => {}}>
        Checkbox Label
      </Checkbox>,
    ))

  it('renders correctly with an error', () =>
    shouldMatchSnapshot(
      <Checkbox error="test error" onChange={() => {}}>
        Checkbox Label
      </Checkbox>,
    ))

  it('renders correctly with a value', () =>
    shouldMatchSnapshot(
      <Checkbox onChange={() => {}} value="test">
        Checkbox Label
      </Checkbox>,
    ))

  it('renders correctly with indeterminate state', () =>
    shouldMatchSnapshot(
      <Checkbox checked="indeterminate" onChange={() => {}}>
        Checkbox Label
      </Checkbox>,
    ))

  it('renders with click event', async () => {
    renderWithTheme(
      <LocalControlValue>
        {({ checked, onChange }) => (
          <Checkbox checked={checked} onChange={onChange} value="test">
            Checkbox Label
          </Checkbox>
        )}
      </LocalControlValue>,
    )

    const input = screen.getByRole<HTMLInputElement>('checkbox', {
      hidden: true,
    })
    await userEvent.click(input)
    expect(input.checked).toBe(true)
  })
})
