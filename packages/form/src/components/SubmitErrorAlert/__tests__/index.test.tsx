import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { Form, Submit, SubmitErrorAlert } from '../..'
import { FORM_ERROR } from '../../../constants'
import { mockErrors } from '../../../mocks'

describe('SubmitErrorAlert', () => {
  test('should render nothing if no error', () => {
    const { asFragment } = renderWithForm(<SubmitErrorAlert />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should display an alert when submitError is present', async () => {
    const onSubmit = vi.fn(() => ({ [FORM_ERROR]: 'hello' }))

    const { asFragment } = renderWithForm(
      <Form errors={mockErrors} onRawSubmit={onSubmit}>
        <Submit>Submit</Submit>
        <SubmitErrorAlert />,
      </Form>,
      { onRawSubmit: onSubmit },
    )
    await userEvent.click(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText('Submit').closest('button') as HTMLButtonElement,
    )
    expect(await screen.findByText('hello')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
