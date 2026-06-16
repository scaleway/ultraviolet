import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, vi, it } from 'vitest'
import { FileInputField } from '..'

describe('fileInputField', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithForm(<FileInputField label="Test" name="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(<FileInputField disabled label="Test" name="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly as an overlay', () => {
    const { asFragment } = renderWithForm(
      <FileInputField label="Test" name="test" variant="overlay">
        overlay
      </FileInputField>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should trigger events', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    renderWithForm(
      <FileInputField data-testid="input" label="label" name="Test" onChange={onChange}>
        <FileInputField.Button>Add here</FileInputField.Button>
      </FileInputField>,
    )

    const button = screen.getByText('Add here')
    await user.click(button)

    const file = new File(['dummy content'], 'test.txt', {
      type: 'text/plain',
    })

    const fileInput = screen.getByTestId('input')
    await user.upload(fileInput, file)

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledOnce()
    })
  })

  it('should use provided id prop', () => {
    const customId = 'custom-file-input-field-id'
    const label = 'Test files'
    const { asFragment } = renderWithForm(<FileInputField id={customId} label={label} name="test" />)

    const input = screen.getByLabelText(label)
    expect(input).toHaveAttribute('id', customId)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should trigger onBlur when input loses focus', () => {
    const onBlur = vi.fn()
    const label = 'Test files'

    renderWithForm(
      <FileInputField label={label} name="test" onBlur={onBlur}>
        <FileInputField.Button>Add here</FileInputField.Button>
      </FileInputField>,
    )

    const input = screen.getByLabelText(label)
    input.focus()
    input.blur()
    expect(onBlur).toHaveBeenCalled()
  })
})
