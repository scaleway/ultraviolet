import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, vi, it } from 'vitest'
import { Submit, SubmitErrorAlert } from '../..'
import { renderWithForm } from '../../../__tests__/helpers'

describe('submitErrorAlert', () => {
  it('should render nothing if no error', () => {
    const { asFragment } = renderWithForm(<SubmitErrorAlert />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should display an alert when submitError is present', async () => {
    const onSubmit = vi.fn(() => 'hello')

    const { asFragment } = renderWithForm(
      <>
        <Submit>Submit</Submit>
        <SubmitErrorAlert />,
      </>,
      {},
      { onSubmit },
    )
    await userEvent.click(screen.getByText('Submit').closest('button')!)
    await expect(screen.findByText('hello')).resolves.toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
