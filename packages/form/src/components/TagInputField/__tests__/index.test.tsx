import { renderHook, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm, renderWithTheme } from '@utils/test'
import { useForm } from 'react-hook-form'
import { describe, expect, test, vi } from 'vitest'
import { Form, Submit, TagInputField } from '../..'
import { mockErrors } from '../../../mocks'

const alpha = /^[a-zA-Z]*$/

describe('TagInputField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <TagInputField name="test" placeholder="placeholder" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with regex', () => {
    const { asFragment } = renderWithForm(
      <>
        <TagInputField
          label="Test"
          name="test"
          required
          clearable
          regex={[alpha]}
        />
        <Submit>Test</Submit>
      </>,
      { defaultValues: { test: ['4'] } },
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should works with defaultValues', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() =>
      useForm<{ test: string[] }>({ defaultValues: { test: ['First'] } }),
    )

    const { asFragment } = renderWithTheme(
      <Form onSubmit={onSubmit} errors={mockErrors} methods={result.current}>
        <TagInputField label="Test" name="test" required clearable />
        <Submit>Submit</Submit>
      </Form>,
    )

    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })
    expect(onSubmit.mock.calls[0][0]).toEqual({
      test: ['First'],
    })
    expect(asFragment()).toMatchSnapshot()
  })
})
