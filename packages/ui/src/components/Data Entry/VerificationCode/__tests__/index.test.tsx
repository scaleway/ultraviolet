import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { VerificationCode } from '..'

describe('verificationCode', () => {
  it('renders correctly with default values', () => {
    const { asFragment } = renderWithTheme(<VerificationCode />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with initial value and placeholder and 6 fields', () => {
    const { asFragment } = renderWithTheme(<VerificationCode fields={6} initialValue="13" placeholder="000000" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should handle typing and focus', async () => {
    const onChange = vi.fn()
    const { asFragment } = renderWithTheme(<VerificationCode fields={4} type="number" onChange={onChange} />)

    const input = screen.getByRole('textbox')
    await userEvent.type(input, '1')
    expect(onChange).toHaveBeenCalledExactlyOnceWith('1')
    expect(screen.getByTestId('box-0')).toHaveTextContent('1')

    expect(asFragment()).toMatchSnapshot()
  })

  it('replaces the digit under the caret when typing into a full field instead of shifting', async () => {
    const onChange = vi.fn()

    renderWithTheme(<VerificationCode fields={4} initialValue="1234" onChange={onChange} />)

    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.click(input)
    expect(input).toHaveFocus()

    await userEvent.type(input, '9', { skipClick: true })

    expect(input).toHaveValue('1239')
    expect(onChange).toHaveBeenCalledExactlyOnceWith('1239')
  })

  it('replaces the digit in a filled box of a partially filled field instead of shifting', async () => {
    const onChange = vi.fn()

    renderWithTheme(<VerificationCode fields={4} initialValue="12" onChange={onChange} />)

    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.click(input)
    expect(input).toHaveFocus()

    await userEvent.keyboard('[arrowLeft]')
    await userEvent.type(input, '9', { skipClick: true })

    expect(input).toHaveValue('19')
    expect(onChange).toHaveBeenCalledExactlyOnceWith('19')
  })

  it('replaces the last digit when typing at the end of a full field', async () => {
    const onChange = vi.fn()

    renderWithTheme(<VerificationCode fields={4} initialValue="1234" onChange={onChange} />)

    const input = screen.getByRole('textbox')
    await userEvent.type(input, '9')

    expect(input).toHaveValue('1239')
    expect(onChange).toHaveBeenCalledExactlyOnceWith('1239')
  })

  it('should trigger onChange and onComplete after typing', async () => {
    const onChange = vi.fn()
    const onComplete = vi.fn()

    renderWithTheme(<VerificationCode fields={4} onChange={onChange} onComplete={onComplete} type="number" />)

    const input = screen.getByRole('textbox')
    await userEvent.type(input, '1234')

    expect(onComplete).toHaveBeenCalledExactlyOnceWith('1234')
    expect(onChange).toHaveBeenCalledWith('1234')
    expect(onChange).toHaveBeenCalledTimes(4)
  })

  it('should delete the last digit when pressing backspace', async () => {
    const onChange = vi.fn()

    renderWithTheme(<VerificationCode fields={4} initialValue="1234" onChange={onChange} />)

    const input = screen.getByRole('textbox')
    await userEvent.click(input)
    await userEvent.keyboard('{Backspace}')

    expect(input).toHaveValue('123')
    expect(onChange).toHaveBeenCalledExactlyOnceWith('123')
  })

  it('should delete the character under the caret when pressing backspace', async () => {
    const onChange = vi.fn()

    renderWithTheme(<VerificationCode fields={4} initialValue="1234" onChange={onChange} />)

    const input = screen.getByRole('textbox')
    await userEvent.click(input)
    await userEvent.keyboard('[arrowLeft]')
    await userEvent.keyboard('[arrowLeft]')
    await userEvent.keyboard('{Backspace}')

    expect(input).toHaveValue('134')
    expect(onChange).toHaveBeenCalledExactlyOnceWith('134')
  })

  it('should not change the value when pressing backspace on an empty field', async () => {
    const onChange = vi.fn()

    renderWithTheme(<VerificationCode fields={4} onChange={onChange} />)

    const input = screen.getByRole('textbox')
    await userEvent.click(input)
    await userEvent.keyboard('{Backspace}')

    expect(input).toHaveValue('')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('should trigger onChange and onComplete after paste', async () => {
    const onChange = vi.fn()
    const onComplete = vi.fn()

    renderWithTheme(<VerificationCode fields={4} onChange={onChange} onComplete={onComplete} type="number" />)

    await userEvent.click(screen.getByRole('textbox'))
    await userEvent.paste('1234')

    expect(onChange).toHaveBeenLastCalledWith('1234')
    expect(onChange).toHaveBeenCalledOnce()

    expect(onComplete).toHaveBeenLastCalledWith('1234')
    expect(onComplete).toHaveBeenCalledOnce()
  })

  it('should cap the value to the number of fields', async () => {
    const onChange = vi.fn()
    renderWithTheme(<VerificationCode fields={4} type="number" onChange={onChange} />)

    const input = screen.getByRole('textbox')
    await userEvent.click(input)
    await userEvent.paste('1234567')

    expect(input).toHaveValue('1234')
    expect(onChange).toHaveBeenCalledExactlyOnceWith('1234')
  })

  it('should sanitize non numeric characters when type is number', async () => {
    renderWithTheme(<VerificationCode fields={4} />)

    const input = screen.getByRole('textbox')
    await userEvent.type(input, '1a34')

    expect(input).toHaveValue('134')
  })

  it('should not sanitize characters when type is text', async () => {
    renderWithTheme(<VerificationCode fields={6} type="text" />)

    const input = screen.getByRole('textbox')
    await userEvent.type(input, '1a34')

    expect(input).toHaveValue('1a34')
  })

  it('replaces the character under the caret when type is text', async () => {
    const onChange = vi.fn()

    renderWithTheme(<VerificationCode fields={4} type="text" initialValue="abcd" onChange={onChange} />)

    const input = screen.getByRole('textbox')
    await userEvent.click(input)
    await userEvent.type(input, 'z', { skipClick: true })

    expect(input).toHaveValue('abcz')
    expect(onChange).toHaveBeenCalledExactlyOnceWith('abcz')
  })

  it('should trigger onChange and onComplete with text values', async () => {
    const onChange = vi.fn()
    const onComplete = vi.fn()

    renderWithTheme(<VerificationCode fields={4} type="text" onChange={onChange} onComplete={onComplete} />)

    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'abcd')

    expect(onComplete).toHaveBeenCalledExactlyOnceWith('abcd')
    expect(onChange).toHaveBeenCalledWith('abcd')
    expect(onChange).toHaveBeenCalledTimes(4)
  })

  it('should handle error', () => {
    const { asFragment } = renderWithTheme(<VerificationCode error fields={4} initialValue="1" type="number" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('render correctly with small size', () => {
    const { asFragment } = renderWithTheme(<VerificationCode size="small" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('render correctly with helper', () => {
    const { asFragment } = renderWithTheme(<VerificationCode helper="test-helper" label="test" />)

    const code = screen.getByRole('textbox', { name: 'test' })
    expect(code).toHaveAccessibleDescription('test-helper')
    expect(asFragment()).toMatchSnapshot()
  })

  it('render correctly with label', () => {
    const { asFragment } = renderWithTheme(<VerificationCode label="test" />)

    const code = screen.getByRole('textbox', { name: 'test' })
    expect(code).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  it('render correctly with accessibleLabel', () => {
    const { asFragment } = renderWithTheme(<VerificationCode accessibleLabel="test" />)

    const code = screen.getByRole('textbox', { name: 'test' })
    expect(code).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  it('render correctly with error as string', () => {
    const { asFragment } = renderWithTheme(<VerificationCode error="error-test" label="test" />)
    expect(asFragment()).toMatchSnapshot()
    const code = screen.getByRole('textbox', { name: 'test' })

    expect(code).toHaveAccessibleDescription('error-test')
  })

  it('render correctly with error as boolean', () => {
    const { asFragment } = renderWithTheme(<VerificationCode error />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('render correctly with success as boolean', () => {
    const { asFragment } = renderWithTheme(<VerificationCode success />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('render correctly with success as string', () => {
    const { asFragment } = renderWithTheme(<VerificationCode success="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('render correctly with labelDescription', () => {
    const { asFragment } = renderWithTheme(
      <VerificationCode label="test" labelDescription={<span>description</span>} />,
    )

    expect(screen.getByText('description')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly disabled', () => {
    const { asFragment } = renderWithTheme(<VerificationCode disabled label="test" />)

    const code = screen.getByRole('textbox', { name: 'test' })
    expect(code).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })
})
