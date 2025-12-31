import { act, fireEvent, renderHook, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { mockFormErrors, renderWithForm, renderWithTheme } from '@utils/test'
import { useForm } from 'react-hook-form'
import { describe, expect, test, vi } from 'vitest'
import { SliderField, Submit } from '../..'
import { Form } from '../../Form'

const options = [
  { label: '1Mb', value: 1 },
  { label: '3Mb', value: 3 },
  { label: '5Mb', value: 5 },
  { label: '10Mb', value: 10 },
  { label: '50Mb', value: 50 },
  { label: '100Mb', value: 100 },
  { label: '500Mb', value: 500 },
]

describe('sliderField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(<SliderField name="test" value={0} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with possible values', () => {
    const { asFragment } = renderWithForm(
      <SliderField name="test" options={options} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with possible values and double', () => {
    const { asFragment } = renderWithForm(
      <SliderField double name="test" options={options} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <SliderField aria-label="Slider Input" disabled name="test" value={10} />,
    )
    const input = screen.getAllByLabelText('Slider Input')[1]
    expect(input).toBeDisabled()

    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events correctly', () => {
    const onFocus = vi.fn(() => {})
    const onBlur = vi.fn(() => {})

    const { asFragment } = renderWithForm(
      <SliderField
        input
        label="Test"
        max={10}
        min={0}
        name="test"
        onBlur={onBlur}
        onFocus={onFocus}
        required
      />,
    )
    const input = screen.getByRole('slider', { hidden: true })
    act(() => input.focus())
    expect(onFocus).toHaveBeenCalledOnce()
    act(() => input.blur())
    expect(onBlur).toHaveBeenCalledOnce()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should work fine with form setValue', async () => {
    const onSubmit = vi.fn()
    const onBlur = vi.fn(() => {})
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
        errors={mockFormErrors}
        methods={result.current}
        onSubmit={value => {
          onSubmit(value)
        }}
      >
        <SliderField
          input
          label="Test"
          max={10}
          min={0}
          name="test"
          onBlur={onBlur}
          required
        />
        <Submit>Submit</Submit>
      </Form>,
    )

    const slider = screen.getByRole<HTMLInputElement>('slider')
    const submit = screen.getByText('Submit')
    expect(slider).toHaveValue('10')
    await userEvent.click(submit)
    expect(onSubmit).toHaveBeenCalledWith({
      test: 10,
    })

    const input = screen.getByTestId<HTMLInputElement>('slider-input')
    await userEvent.type(input, '5')
    await userEvent.tab()
    expect(slider.value).toBe('10')
  })

  test('should work correctly with possibleValues', () => {
    const { result } = renderHook(() => useForm({ mode: 'onChange' }))

    renderWithTheme(
      <Form
        errors={mockFormErrors}
        methods={result.current}
        onSubmit={() => {}}
      >
        <SliderField label="Test" name="test" options={options} />
      </Form>,
    )

    const input = screen.getByRole('slider', { hidden: true })

    fireEvent.change(input, { target: { value: '2' } })
    expect(input).toHaveValue('2')
    expect(result.current.getValues('test')).toBe(5)

    fireEvent.change(input, { target: { value: '5' } })
    expect(input).toHaveValue('5')
    expect(result.current.getValues('test')).toBe(100)
  })

  test('should work correctly with possibleValues and double', () => {
    const { result } = renderHook(() => useForm({ mode: 'onChange' }))

    renderWithTheme(
      <Form
        errors={mockFormErrors}
        methods={result.current}
        onSubmit={() => {}}
      >
        <SliderField double label="Test" name="test" options={options} />
      </Form>,
    )

    const input1 = screen.getAllByRole('slider', { hidden: true })[0]
    const input2 = screen.getAllByRole('slider', { hidden: true })[1]

    fireEvent.change(input1, { target: { value: '2' } })
    expect(input1).toHaveValue('2')
    expect(result.current.getValues('test')).toStrictEqual([5, 500])

    fireEvent.change(input2, { target: { value: '5' } })
    expect(input2).toHaveValue('5')
    expect(result.current.getValues('test')).toStrictEqual([5, 100])
  })
})
