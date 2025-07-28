import { renderHook, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm, renderWithTheme } from '@utils/test'
import { useForm } from 'react-hook-form'
import { describe, expect, test, vi } from 'vitest'
import { mockErrors } from '../../../mocks'
import { Form, Submit, SwitchButtonField } from '../..'

describe('SwitchButtonField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <SwitchButtonField name="test" onChange={() => vi.fn()}>
        <SwitchButtonField.Option value="left">Left</SwitchButtonField.Option>
        <SwitchButtonField.Option value="right">Right</SwitchButtonField.Option>
      </SwitchButtonField>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should works with defaultValues', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() =>
      useForm<{ test: string[] }>({ defaultValues: { test: ['right'] } }),
    )

    const { asFragment } = renderWithTheme(
      <Form onSubmit={onSubmit} errors={mockErrors} methods={result.current}>
        <SwitchButtonField name="test" onChange={() => vi.fn()}>
          <SwitchButtonField.Option value="left">Left</SwitchButtonField.Option>
          <SwitchButtonField.Option value="right">
            Right
          </SwitchButtonField.Option>
        </SwitchButtonField>
        ,<Submit>Submit</Submit>
      </Form>,
    )

    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })
    expect(onSubmit.mock.calls[0][0]).toEqual({
      test: ['right'],
    })
    expect(asFragment()).toMatchSnapshot()
  })
})
