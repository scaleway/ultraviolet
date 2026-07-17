import { fireEvent, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest'
import { TextArea } from '..'

describe('textArea', () => {
  let spyGetComputedStyle: Mock

  beforeEach(() => {
    const mockTextareaStyle = { lineHeight: '16px' } as CSSStyleDeclaration
    spyGetComputedStyle = vi.spyOn(window, 'getComputedStyle').mockReturnValue(mockTextareaStyle)
  })
  afterEach(() => {
    spyGetComputedStyle.mockRestore()
  })

  it('should render correctly with basic props', () => {
    const { asFragment } = renderWithTheme(<TextArea label="Test" onChange={() => {}} value="test" />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should control the value', () => {
    const onChange = vi.fn()

    renderWithTheme(<TextArea label="Test" onChange={onChange} value="test" />)

    const textarea = screen.getByLabelText<HTMLTextAreaElement>('Test')
    expect(textarea.value).toBe('test')
    // userEvent.type do not work here at the moment
    fireEvent.change(textarea, { target: { value: 'another value' } })
    expect(onChange).toHaveBeenCalledWith('another value')
  })

  it('should be clearable', async () => {
    const onChange = vi.fn()

    renderWithTheme(<TextArea clearable label="Test" onChange={onChange} value="test" />)

    const textarea = screen.getByLabelText<HTMLTextAreaElement>('Test')
    expect(textarea.value).toBe('test')
    const clearableButton = screen.getByLabelText('clear value')
    await userEvent.click(clearableButton)
    expect(onChange).toHaveBeenCalledWith('')
  })

  it('should render correctly when input is disabled', () => {
    const { asFragment } = renderWithTheme(<TextArea disabled label="Test" onChange={() => {}} value="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly when input is readOnly', () => {
    const { asFragment } = renderWithTheme(<TextArea label="Test" onChange={() => {}} readOnly value="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly when it is required', () => {
    const { asFragment } = renderWithTheme(<TextArea label="Test" onChange={() => {}} required value="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly with maxlength', () => {
    const { asFragment } = renderWithTheme(<TextArea label="Test" maxLength={3} onChange={() => {}} value="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly when input has a success sentiment', () => {
    const { asFragment } = renderWithTheme(<TextArea label="Test" onChange={() => {}} success="success" value="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly when input  has a error sentiment', () => {
    const { asFragment } = renderWithTheme(<TextArea error="success" label="Test" onChange={() => {}} value="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render with auto rows', () => {
    const { asFragment } = renderWithTheme(
      <TextArea error="success" label="Test" onChange={() => {}} rows="auto" value="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render with AutoExpandMax', () => {
    const { asFragment } = renderWithTheme(
      <TextArea error="success" label="Test" maxRows={3} onChange={() => {}} value="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it('should render with AutoExpandMax and rows', () => {
    const { asFragment } = renderWithTheme(
      <TextArea error="success" label="Test" maxRows={3} onChange={() => {}} rows={2} value="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should display success message', () => {
    const onChange = vi.fn()
    const successMessage = 'success message'

    renderWithTheme(<TextArea label="Test" onChange={onChange} success={successMessage} value="test" />)

    expect(screen.getByText(successMessage)).toBeDefined()
  })

  it('should display error message', () => {
    const onChange = vi.fn()
    const errorMessage = 'error!'

    renderWithTheme(<TextArea label="Test" onChange={onChange} success={errorMessage} value="test" />)

    expect(screen.getByText(errorMessage)).toBeDefined()
  })

  it('should display helper message', () => {
    const onChange = vi.fn()
    const helperMessage = 'helper'

    renderWithTheme(<TextArea helper={helperMessage} label="Test" onChange={onChange} value="test" />)

    expect(screen.getByText(helperMessage)).toBeDefined()
  })

  it('should not display helper message when success is displayed', () => {
    const onChange = vi.fn()
    const successMessage = 'success message'
    const helperMessage = 'helper'

    renderWithTheme(
      <TextArea helper={helperMessage} label="Test" onChange={onChange} success={successMessage} value="test" />,
    )

    expect(screen.getByText(successMessage)).toBeDefined()
    expect(screen.queryByText(helperMessage)).toBeNull()
  })

  it('should not display helper message when error is displayed', () => {
    const onChange = vi.fn()
    const error = 'error!'
    const helperMessage = 'helper'

    renderWithTheme(<TextArea error={error} helper={helperMessage} label="Test" onChange={onChange} value="test" />)

    expect(screen.getByText(error)).toBeDefined()
    expect(screen.queryByText(helperMessage)).toBeNull()
  })

  it.each(['small', 'medium', 'large'] as const)(`renders correctly with size %s`, size => {
    const { asFragment } = renderWithTheme(<TextArea label="Test" onChange={() => {}} value="test" size={size} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
