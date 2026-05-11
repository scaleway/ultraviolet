import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { Submit, TextInputField } from '../..'

const alpha = /^[a-zA-Z]*$/

describe('submit', () => {
  it('renders correctly ', () => {
    const { asFragment } = renderWithForm(<Submit>Test</Submit>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('form is invalid', () => {
    const { asFragment } = renderWithForm(
      <>
        <TextInputField label="test" name="toto" regex={[alpha]} />
        <Submit>Test</Submit>
      </>,
      { defaultValues: { toto: '4' } },
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('form is submitting', async () => {
    const { asFragment } = renderWithForm(
      <Submit>Test</Submit>,
      {},
      {
        onSubmit: async () =>
          new Promise(resolve => {
            setTimeout(() => resolve(undefined), 500)
          }),
      },
    )
    await userEvent.click(screen.getByText('Test').closest('button')!)
    expect(screen.getByText('Test').closest('button')!).toBeDisabled()

    expect(asFragment()).toMatchSnapshot()
  })
})
