import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { KeyValueField } from '..'

describe('KeyValueField', () => {
  it('should render with default props', async () => {
    const { asFragment } = renderWithForm(
      <KeyValueField
        addButton={{
          maxSizeReachedTooltip:
            'This is a tooltip when the max size is reached',
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
    const addButton = screen.getByTestId('add-button')
    await userEvent.click(addButton)

    const removeButton = screen.getByTestId('remove-button-0')
    await userEvent.click(removeButton)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render with default props & max size', () => {
    const { asFragment } = renderWithForm(
      <KeyValueField
        addButton={{
          maxSizeReachedTooltip:
            'This is a tooltip when the max size is reached',
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
          maxSizeReachedTooltip:
            'This is a tooltip when the max size is reached',
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
    const addButton = screen.getByTestId('add-button')
    expect(addButton).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })
})
