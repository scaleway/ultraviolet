import { renderHook, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { mockFormErrors, renderWithForm, renderWithTheme } from '@utils/test'
import { useForm } from 'react-hook-form'
import { describe, expect, test, vi } from 'vitest'
import { Submit } from '../..'
import { Form } from '../../Form'
import { TextInputField } from '..'

describe('TextInputField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <TextInputField label="Test" name="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly generated', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() =>
      useForm<{ test: string | null }>({ defaultValues: { test: null } }),
    )

    const { asFragment } = renderWithTheme(
      <Form
        onSubmit={onSubmit}
        errors={mockFormErrors}
        methods={result.current}
      >
        <TextInputField label="Test" name="test" required clearable />
        <Submit>Submit</Submit>
      </Form>,
    )

    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0)
    })
    const textInput = screen.getByLabelText('Test')
    await userEvent.type(textInput, 'This is an example')
    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit.mock.calls[0][0]).toEqual({
        test: 'This is an example',
      })
    })
    expect(asFragment()).toMatchSnapshot()
  })
})
