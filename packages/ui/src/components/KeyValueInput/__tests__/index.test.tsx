import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { KeyValueInput } from '..'

const selectInputOptions = [
  { label: 'option-1', value: 'option-1' },
  { label: 'option-2', value: 'option-2' },
]

describe('keyValueInput', () => {
  it('renders correctly', () => {
    const { asFragment } = renderWithTheme(
      <KeyValueInput
        name="key-value-input"
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
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders disabled', () => {
    const { asFragment } = renderWithTheme(
      <KeyValueInput
        disabled
        name="key-value-input"
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
      />,
    )
    expect(screen.getByRole('button', { name: /add/i })).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders readOnly', () => {
    const { asFragment } = renderWithTheme(
      <KeyValueInput
        disabled
        name="key-value-input"
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
      />,
    )

    expect(screen.getByRole('button', { name: /add/i })).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })

  it.each(['small', 'medium', 'large'] as const)(`renders size %s correctly`, size => {
    const { asFragment } = renderWithTheme(
      <KeyValueInput
        name="key-value-input"
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
        size={size}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders readOnly', () => {
    const { asFragment } = renderWithTheme(
      <KeyValueInput
        disabled
        name="key-value-input"
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
      />,
    )

    expect(screen.getByRole('button', { name: /add/i })).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with maxSize', () => {
    const { asFragment } = renderWithTheme(
      <KeyValueInput
        name="key-value-input"
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
        keyvalues={[
          { key: 'key1', value: 'value1' },
          { key: 'key2', value: 'value2' },
        ]}
        maxSize={2}
      />,
    )

    expect(screen.getByRole('button', { name: /add/i })).toBeDisabled()
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })

    for (const deleteButton of deleteButtons) {
      expect(deleteButton).not.toBeDisabled()
    }
    expect(asFragment()).toMatchSnapshot()
  })

  it('should correctly call onChange', async () => {
    const onChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <KeyValueInput
        name="name"
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
        keyvalues={[{ key: '', value: '' }]}
        onChange={onChange}
      />,
    )

    const keyInput = screen.getByRole('textbox', { name: 'key' })
    const valueInput = screen.getByRole('textbox', { name: 'value' })
    expect(keyInput).toBeInTheDocument()

    await userEvent.type(keyInput, '1')
    expect(onChange).toHaveBeenCalledExactlyOnceWith([{ key: '1', value: '' }])

    await userEvent.type(valueInput, '2')
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith([{ key: '', value: '2' }])

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with selectInput', () => {
    const { asFragment } = renderWithTheme(
      <KeyValueInput
        name="key-value-input"
        addButton={{
          maxSizeReachedTooltip: 'This is a tooltip when the max size is reached',
          name: 'add',
          tooltip: 'This is a tooltip',
        }}
        inputKey={{
          label: 'key',
          inputType: 'select',
          options: selectInputOptions,
        }}
        inputValue={{
          inputType: 'select',
          options: selectInputOptions,
          label: 'value',
        }}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should correctly call onChange when select', async () => {
    const onChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <KeyValueInput
        name="key-value-input"
        addButton={{
          maxSizeReachedTooltip: 'This is a tooltip when the max size is reached',
          name: 'add',
          tooltip: 'This is a tooltip',
        }}
        inputKey={{
          label: 'key',
          inputType: 'select',
          options: selectInputOptions,
        }}
        inputValue={{
          inputType: 'select',
          options: selectInputOptions,
          label: 'value',
        }}
        keyvalues={[{ key: '', value: '' }]}
        onChange={onChange}
      />,
    )

    const keyInput = screen.getByRole('combobox', { name: 'key' })
    const valueInput = screen.getByRole('combobox', { name: 'value' })
    expect(keyInput).toBeInTheDocument()

    await userEvent.click(keyInput)

    const dropdown = screen.getByRole('dialog')
    await waitFor(() => {
      expect(dropdown).toBeVisible()
    })

    const option1Key = screen.getByRole('option', {
      name: /option-1/iu,
    })

    await userEvent.click(option1Key)
    expect(onChange).toHaveBeenCalledExactlyOnceWith([{ key: 'option-1', value: '' }])

    await userEvent.click(valueInput)

    const option2Value = screen.getByRole('option', {
      name: /option-2/iu,
    })

    await userEvent.click(option2Value)
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith([{ key: '', value: 'option-2' }])

    expect(asFragment()).toMatchSnapshot()
  })

  it('should work when adding a line', async () => {
    const onChange = vi.fn()

    const { asFragment } = renderWithTheme(
      <KeyValueInput
        name="key-value-input"
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
        keyvalues={[{ key: 'key1', value: 'value1' }]}
        onChange={onChange}
      />,
    )

    const addButton = screen.getByRole('button', { name: /add/i })
    expect(addButton).not.toBeDisabled()

    await userEvent.click(addButton)
    expect(onChange).toHaveBeenCalledExactlyOnceWith([
      { key: 'key1', value: 'value1' },
      { key: '', value: '' },
    ])

    expect(asFragment()).toMatchSnapshot()
  })

  it('should work when removing a line', async () => {
    const onChange = vi.fn()

    const { asFragment } = renderWithTheme(
      <KeyValueInput
        name="key-value-input"
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
        keyvalues={[{ key: 'key1', value: 'value1' }]}
        onChange={onChange}
      />,
    )

    const deleteButton = screen.getByRole('button', { name: /delete/i })
    expect(deleteButton).not.toBeDisabled()

    await userEvent.click(deleteButton)
    expect(onChange).toHaveBeenCalledExactlyOnceWith([])

    expect(asFragment()).toMatchSnapshot()
  })
})
