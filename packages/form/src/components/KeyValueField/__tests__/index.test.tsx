import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { KeyValueField } from '..'
import { mockFormErrors, renderWithForm } from '../../../__tests__/helpers'
import { Submit } from '../../Submit'

describe('keyValueField', () => {
  it('should render with default props', async () => {
    const { asFragment } = renderWithForm(
      <KeyValueField
        addButton={{
          maxSizeReachedTooltip: 'This is a tooltip when the max size is reached',
          name: 'add',
          tooltip: 'This is a tooltip',
        }}
        inputKey={{
          label: 'key',
        }}
        inputValue={{
          label: 'value',
        }}
        name="test"
      />,
    )
    const addButton = screen.getByRole('button', { name: /add/i })
    await userEvent.click(addButton)

    const deleteButton = screen.getByRole('button', { name: /delete/i })
    await userEvent.click(deleteButton)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render with default props & max size', () => {
    const { asFragment } = renderWithForm(
      <KeyValueField
        addButton={{
          maxSizeReachedTooltip: 'This is a tooltip when the max size is reached',
          name: 'add',
          tooltip: 'This is a tooltip',
        }}
        inputKey={{
          label: 'key',
        }}
        inputValue={{
          label: 'value',
        }}
        maxSize={42}
        name="test"
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render with default props in readonly mode', () => {
    const { asFragment } = renderWithForm(
      <KeyValueField
        addButton={{
          maxSizeReachedTooltip: 'This is a tooltip when the max size is reached',
          name: 'add',
          tooltip: 'This is a tooltip',
        }}
        inputKey={{
          label: 'key',
        }}
        inputValue={{
          label: 'value',
        }}
        name="test"
        readOnly
      />,
    )
    const addButton = screen.getByRole('button', { name: /add/i })
    expect(addButton).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should add error with unvalidated regex', async () => {
    const { asFragment } = renderWithForm(
      <KeyValueField
        addButton={{
          maxSizeReachedTooltip: 'This is a tooltip when the max size is reached',
          name: 'add',
          tooltip: 'This is a tooltip',
        }}
        inputKey={{
          label: 'key',
        }}
        inputValue={{
          label: 'value',
          regex: [/^[a-zA-Z]*$/u],
        }}
        name="test"
      />,
    )
    const addButton = screen.getByRole('button', { name: /add/i })
    await userEvent.click(addButton)

    const input = screen.getByRole('textbox', { name: 'value' })
    expect(input).toBeInTheDocument()

    await userEvent.type(input, '2')
    expect(input).toHaveAccessibleDescription(/This field should match the regex/i)
    expect(input).toBeInvalid()

    await userEvent.clear(input)
    await userEvent.type(input, 'a')

    expect(input).toBeValid()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should disable submit button when required and empty', () => {
    const onSubmit = vi.fn()
    const { asFragment } = renderWithForm(
      <>
        <KeyValueField
          addButton={{
            name: 'add',
          }}
          inputKey={{
            label: 'key',
          }}
          inputValue={{
            label: 'value',
          }}
          required
          name="test"
        />
        ,<Submit>Submit</Submit>
      </>,
      {
        defaultValues: {
          test: 10,
        },
        mode: 'onChange',
      },
      {
        errors: mockFormErrors,
        onSubmit: value => {
          onSubmit(value)
        },
      },
    )

    const submitButton = screen.getByRole('button', { name: 'Submit' })
    expect(submitButton).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })
})
