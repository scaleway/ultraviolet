import { act, screen } from '@testing-library/react'
import { renderWithForm } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { KeyValueField } from '..'

describe('KeyValueField', () => {
  it('should render with default props', () => {
    const { asFragment } = renderWithForm(
      <KeyValueField
        name="test"
        inputKey={{
          label: 'key',
        }}
        inputValue={{
          label: 'value',
        }}
        addButton={{
          name: 'add',
          tooltip: 'This is a tooltip',
          maxSizeReachedTooltip:
            'This is a tooltip when the max size is reached',
        }}
      />,
    )
    const addButton = screen.getByTestId('add-button')
    act(() => {
      addButton.click()
    })

    const removeButton = screen.getByTestId('remove-button-0')
    act(() => {
      removeButton.click()
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render with default props & max size', () => {
    const { asFragment } = renderWithForm(
      <KeyValueField
        name="test"
        inputKey={{
          label: 'key',
        }}
        inputValue={{
          label: 'value',
        }}
        addButton={{
          name: 'add',
          tooltip: 'This is a tooltip',
          maxSizeReachedTooltip:
            'This is a tooltip when the max size is reached',
        }}
        maxSize={42}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render with default props in readonly mode', () => {
    const { asFragment } = renderWithForm(
      <KeyValueField
        name="test"
        inputKey={{
          label: 'key',
        }}
        inputValue={{
          label: 'value',
        }}
        addButton={{
          name: 'add',
          tooltip: 'This is a tooltip',
          maxSizeReachedTooltip:
            'This is a tooltip when the max size is reached',
        }}
        readonly
      />,
    )
    const addButton = screen.getByTestId('add-button')
    expect(addButton).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })
})
