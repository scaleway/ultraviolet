import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { VerificationCode } from '..'

const pasteEventWithValue = (selector: HTMLElement, value: string) =>
  fireEvent.paste(selector, {
    clipboardData: { getData: () => value },
  })

describe('verificationCode', () => {
  test('renders correctly with default values', () => {
    const { asFragment } = renderWithTheme(<VerificationCode />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with initial value and placeholder and 6 fields', () => {
    const { asFragment } = renderWithTheme(
      <VerificationCode fields={6} initialValue="13" placeholder="0037" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should handle keyDown and special key cases and focus/change events', () => {
    const { asFragment } = renderWithTheme(
      <VerificationCode fields={4} initialValue="1" type="number" />,
    )

    const input0 = screen.getByTestId('0')
    fireEvent.keyDown(input0, { keyCode: 8 }) // press backspace
    fireEvent.keyDown(input0, { keyCode: 37 }) // press arrow left
    fireEvent.keyDown(input0, { keyCode: 39 }) // press arrow right
    fireEvent.keyDown(input0, { keyCode: 38 }) // press arrow up
    fireEvent.keyDown(input0, { keyCode: 40 }) // press arrow down
    fireEvent.keyDown(input0, { keyCode: 50 }) // press 2

    const input1 = screen.getByTestId('1')

    input1.focus()
    fireEvent.keyDown(input1, { keyCode: 8 }) // press backspace

    fireEvent.change(input1, { target: { value: '2' } })
    fireEvent.change(input1, { target: { value: '' } })

    expect(asFragment()).toMatchSnapshot()
  })

  test('should handle paste with no overflowing values', () => {
    const { asFragment } = renderWithTheme(
      <VerificationCode fields={4} initialValue="1" type="number" />,
    )
    pasteEventWithValue(screen.getByDisplayValue('1'), '1234')
    expect(asFragment()).toMatchSnapshot()
  })

  test('should handle and replace non number with "" when type is number', () => {
    const { asFragment } = renderWithTheme(
      <VerificationCode fields={4} initialValue="1" />,
    )
    pasteEventWithValue(screen.getByDisplayValue('1'), '1a34')
    expect(asFragment()).toMatchSnapshot()
  })

  test('should handle paste with overflowing values', () => {
    const { asFragment } = renderWithTheme(
      <VerificationCode fields={4} initialValue="12" />,
    )
    pasteEventWithValue(screen.getByDisplayValue('1'), '123456')
    expect(asFragment()).toMatchSnapshot()
  })

  test('should handle paste with overflowing values at different index than 0', () => {
    const { asFragment } = renderWithTheme(
      <VerificationCode fields={4} initialValue="12" />,
    )
    pasteEventWithValue(screen.getByDisplayValue('2'), '123456')
    expect(asFragment()).toMatchSnapshot()
  })

  test('should handle paste when type is not number', () => {
    const { asFragment } = renderWithTheme(
      <VerificationCode fields={6} initialValue="12" type="text" />,
    )
    pasteEventWithValue(screen.getByDisplayValue('2'), 'h23a*6')
    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger onChange and onComplete after pasting values', () => {
    const onChange = vi.fn()
    const onComplete = vi.fn()

    renderWithTheme(
      <VerificationCode
        fields={4}
        initialValue="1"
        onChange={onChange}
        onComplete={onComplete}
        type="number"
      />,
    )

    pasteEventWithValue(screen.getByDisplayValue('1'), '12')

    expect(onChange).toHaveBeenLastCalledWith('12')
    expect(onChange).toHaveBeenCalledOnce()

    pasteEventWithValue(screen.getByDisplayValue('1'), '1234')
    expect(onComplete).toHaveBeenLastCalledWith('1234')
    expect(onComplete).toHaveBeenCalledOnce()
  })

  test('should handle error', () => {
    const { asFragment } = renderWithTheme(
      <VerificationCode error fields={4} initialValue="1" type="number" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('render correctly with small size', () => {
    const { asFragment } = renderWithTheme(<VerificationCode size="small" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('render correctly with helper', () => {
    const { asFragment } = renderWithTheme(<VerificationCode helper="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('render correctly with label', () => {
    const { asFragment } = renderWithTheme(<VerificationCode label="test" />)

    const code = screen.getByLabelText('test')
    expect(code).toBeInTheDocument()
    expect(code).toBeEnabled()
    expect(asFragment()).toMatchSnapshot()
  })

  test('render correctly with error as string', () => {
    const { asFragment } = renderWithTheme(<VerificationCode error="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('render correctly with error as boolean', () => {
    const { asFragment } = renderWithTheme(<VerificationCode error />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('render correctly with success as boolean', () => {
    const { asFragment } = renderWithTheme(<VerificationCode success />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('render correctly with success as string', () => {
    const { asFragment } = renderWithTheme(<VerificationCode success="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('render correctly with labelDescription', () => {
    const { asFragment } = renderWithTheme(
      <VerificationCode
        label="test"
        labelDescription={<span>description</span>}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled true', () => {
    const { asFragment } = renderWithTheme(<VerificationCode disabled />)
    expect(asFragment()).toMatchSnapshot()
  })
})
