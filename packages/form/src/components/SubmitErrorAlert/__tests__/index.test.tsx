import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { Submit, SubmitErrorAlert } from '../..'

describe('submitErrorAlert', () => {
  test('should render nothing if no error', () => {
    const { asFragment } = renderWithForm(<SubmitErrorAlert />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should display an alert when submitError is present', async () => {
    const onSubmit = vi.fn(() => 'hello')

    const { asFragment } = renderWithForm(
      <>
        <Submit>Submit</Submit>
        <SubmitErrorAlert />,
      </>,
      {},
      { onSubmit },
    )
    await userEvent.click(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText('Submit').closest('button')!,
    )
    expect(await screen.findByText('hello')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
