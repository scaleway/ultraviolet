import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, vi, it } from 'vitest'
import { Submit, SwitchButtonField } from '../..'
import { mockErrors } from '../../../mocks'

describe('switchButtonField', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <SwitchButtonField name="test" onChange={() => vi.fn()}>
        <SwitchButtonField.Option value="left">Left</SwitchButtonField.Option>
        <SwitchButtonField.Option value="right">Right</SwitchButtonField.Option>
      </SwitchButtonField>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should works with defaultValues', async () => {
    const onSubmit = vi.fn()

    const { asFragment } = renderWithForm(
      <>
        <SwitchButtonField name="test" onChange={() => vi.fn()}>
          <SwitchButtonField.Option value="left">Left</SwitchButtonField.Option>
          <SwitchButtonField.Option value="right">Right</SwitchButtonField.Option>
        </SwitchButtonField>
        ,<Submit>Submit</Submit>
      </>,
      { defaultValues: { test: ['right'] } },
      { onSubmit, errors: mockErrors },
    )

    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledOnce()
    })
    expect(onSubmit.mock.calls[0][0]).toEqual({
      test: ['right'],
    })
    expect(asFragment()).toMatchSnapshot()
  })
})
