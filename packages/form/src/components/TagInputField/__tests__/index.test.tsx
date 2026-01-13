import { renderHook, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm, renderWithTheme } from '@utils/test'
import { useForm } from 'react-hook-form'
import { describe, expect, test, vi } from 'vitest'
import { mockErrors } from '../../../mocks'
import { Form, Submit, TagInputField } from '../..'

const alpha = /^[a-zA-Z]*$/

describe('tagInputField', () => {
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
          clearable
          label="Test"
          name="test"
          regex={[alpha]}
          required
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
      <Form errors={mockErrors} methods={result.current} onSubmit={onSubmit}>
        <TagInputField clearable label="Test" name="test" required />
        <Submit>Submit</Submit>
      </Form>,
    )

    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledOnce()
    })
    expect(onSubmit.mock.calls[0][0]).toEqual({
      test: ['First'],
    })
    expect(asFragment()).toMatchSnapshot()
  })
})
