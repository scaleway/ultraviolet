import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { FileInputField } from '..'

describe('fileInputField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <FileInputField label="Test" name="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <FileInputField disabled label="Test" name="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly as an overlay', () => {
    const { asFragment } = renderWithForm(
      <FileInputField label="Test" name="test" variant="overlay">
        overlay
      </FileInputField>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    renderWithForm(
      <FileInputField
        data-testid="input"
        label="label"
        name="Test"
        onChange={onChange}
      >
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
      expect(onChange).toBeCalledTimes(1)
    })
  })
})
