import { renderHook, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockFormErrors, renderWithForm, renderWithTheme } from '@utils/test'
import { useForm } from 'react-hook-form'
import { describe, expect, test, vi } from 'vitest'
import { TextAreaField } from '..'
import { Submit } from '../..'
import { Form } from '../../Form'

describe('TextAreaField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <TextAreaField label="Test" name="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should submit with onSubmitEnter prop', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() => useForm<{ test: string }>())

    const { asFragment } = renderWithTheme(
      <Form
        onSubmit={onSubmit}
        errors={mockFormErrors}
        methods={result.current}
      >
        <TextAreaField label="Test" name="test" submitOnEnter />
        <Submit>Submit</Submit>
      </Form>,
    )

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0)
    })
    const textareaInput = screen.getByLabelText('Test')
    await userEvent.type(textareaInput, 'This is an example{Enter}')
    await waitFor(() => {
      expect(onSubmit.mock.calls[0][0]).toEqual({
        test: 'This is an example',
      })
    })
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly generated', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() => useForm<{ test: string }>())

    const { asFragment } = renderWithTheme(
      <Form
        onSubmit={onSubmit}
        errors={mockFormErrors}
        methods={result.current}
      >
        <TextAreaField label="Test" name="test" required clearable />
        <Submit>Submit</Submit>
      </Form>,
    )

    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0)
    })
    const textareaInput = screen.getByLabelText('Test')
    await userEvent.type(textareaInput, 'This is an example')
    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit.mock.calls[0][0]).toEqual({
        test: 'This is an example',
      })
    })
    expect(asFragment()).toMatchSnapshot()
  })
})
