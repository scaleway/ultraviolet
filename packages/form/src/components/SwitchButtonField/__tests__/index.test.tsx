import { renderHook, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithForm, renderWithTheme } from '@utils/test'
import { useForm } from 'react-hook-form'
import { describe, expect, test, vi } from 'vitest'
import { Form, Submit, SwitchButtonField } from '../..'
import { mockErrors } from '../../../mocks'

const leftButton = {
  label: 'Left Button Label',
  value: 'left',
}

const rightButton = {
  label: 'Right Button Label',
  value: 'right',
}

describe('SwitchButtonField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <SwitchButtonField
        name="test"
        leftButton={leftButton}
        rightButton={rightButton}
        onChange={() => vi.fn()}
      />,
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
        <SwitchButtonField
          label="Test"
          name="test"
          required
          leftButton={leftButton}
          rightButton={rightButton}
        />
        <Submit>Submit</Submit>
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
