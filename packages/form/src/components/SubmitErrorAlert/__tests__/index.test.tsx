import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Submit, SubmitErrorAlert } from '../..'
import { renderWithForm } from '../../../__tests__/helpers'

describe('submitErrorAlert', () => {
  it('should render nothing if no error', () => {
    const { asFragment } = renderWithForm({ children: <SubmitErrorAlert /> })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should display an alert when submitError is present', async () => {
    const onSubmit = vi.fn(() => 'hello')

    const { asFragment } = renderWithForm({
      children: (
        <>
          <Submit>Submit</Submit>
          <SubmitErrorAlert />,
        </>
      ),
      useFormProps: {},
      formProps: { onSubmit },
    })
    await userEvent.click(screen.getByText('Submit').closest('button')!)
    const errorMessage = await screen.findByText('hello')
    expect(errorMessage).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
