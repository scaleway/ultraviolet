import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Submit, TagInputField } from '../..'
import { renderWithForm } from '../../../__tests__/helpers'
import { mockErrors } from '../../../mocks'

const alpha = /^[a-zA-Z]*$/u

describe('tagInputField', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithForm({ children: <TagInputField name="test" placeholder="placeholder" /> })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly with regex', () => {
    const { asFragment } = renderWithForm({
      children: (
        <>
          <TagInputField clearable label="Test" name="test" regex={[alpha]} required />
          <Submit>Test</Submit>
        </>
      ),
      useFormProps: { defaultValues: { test: ['4'] } },
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should works with defaultValues', async () => {
    const onSubmit = vi.fn()

    const { asFragment } = renderWithForm({
      children: (
        <>
          <TagInputField clearable label="Test" name="test" required />
          <Submit>Submit</Submit>
        </>
      ),
      useFormProps: { defaultValues: { test: ['First'] } },
      formProps: { errors: mockErrors, onSubmit },
    })

    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledOnce()
    })
    expect(onSubmit.mock.calls[0][0]).toStrictEqual({
      test: ['First'],
    })
    expect(asFragment()).toMatchSnapshot()
  })
})
