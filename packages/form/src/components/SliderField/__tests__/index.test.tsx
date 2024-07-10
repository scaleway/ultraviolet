import { renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockFormErrors, renderWithForm, renderWithTheme } from '@utils/test'
import { useForm } from 'react-hook-form'
import { describe, expect, test, vi } from 'vitest'
import { SliderField, Submit } from '../..'
import { Form } from '../../Form'

describe('SliderField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(<SliderField name="test" value={0} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <SliderField name="test" value={10} disabled aria-label="Slider Input" />,
    )
    const input = screen.getAllByLabelText('Slider Input')[1]
    expect(input).toBeDisabled()

    expect(asFragment()).toMatchSnapshot()
  })

  test('should work fine with form setValue', async () => {
    const onSubmit = vi.fn<[{ test: number | null }], void>()
    const { result } = renderHook(() =>
      useForm<{ test: number | null }>({
        defaultValues: {
          test: 10,
        },
        mode: 'onChange',
      }),
    )

    renderWithTheme(
      <Form
        onSubmit={value => onSubmit(value)}
        errors={mockFormErrors}
        methods={result.current}
      >
        <SliderField label="Test" name="test" required />
        <Submit>Submit</Submit>
      </Form>,
    )

    const sliderInput = screen.getByLabelText('Test')
    const submit = screen.getByText('Submit')
    expect(sliderInput).toHaveValue('10')
    await userEvent.click(submit)
    expect(onSubmit).toHaveBeenCalledWith({
      test: 10,
    })
  })
})
