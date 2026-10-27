import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Submit, TextInputField } from '../..'
import { renderWithForm } from '../../../__tests__/helpers'

const alpha = /^[a-zA-Z]*$/u

describe('submit', () => {
  it('renders correctly ', () => {
    const { asFragment } = renderWithForm({ children: <Submit>Test</Submit> })
    expect(asFragment()).toMatchSnapshot()
  })

  it('form is invalid', () => {
    const { asFragment } = renderWithForm({
      children: (
        <>
          <TextInputField label="test" name="toto" regex={[alpha]} />
          <Submit>Test</Submit>
        </>
      ),
      useFormProps: { defaultValues: { toto: '4' } },
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('form is submitting', async () => {
    const { asFragment } = renderWithForm({
      children: <Submit>Test</Submit>,
      useFormProps: {},
      formProps: {
        onSubmit: async () =>
          new Promise(resolve => {
            setTimeout(() => resolve(undefined), 500)
          }),
      },
    })
    await userEvent.click(screen.getByText('Test').closest('button')!)
    expect(screen.getByText('Test').closest('button')!).toBeDisabled()

    expect(asFragment()).toMatchSnapshot()
  })
})
