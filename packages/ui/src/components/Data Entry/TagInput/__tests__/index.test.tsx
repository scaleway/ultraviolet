import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { TagInput } from '..'

describe('tagInput', () => {
  it('should renders correctly', () => {
    const { asFragment } = renderWithTheme(<TagInput onChange={() => {}} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should renders correctly disabled', () => {
    const { asFragment } = renderWithTheme(<TagInput disabled />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should renders correctly readOnly', () => {
    const { asFragment } = renderWithTheme(<TagInput readOnly />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should renders correctly with label', () => {
    const { asFragment } = renderWithTheme(<TagInput label="Label" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should renders correctly with labelDescription', () => {
    const { asFragment } = renderWithTheme(<TagInput labelDescription={<div>label description</div>} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should renders correctly with error', () => {
    const { asFragment } = renderWithTheme(<TagInput error="This is an error" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should renders correctly with success', () => {
    const { asFragment } = renderWithTheme(<TagInput success="This is a success" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should renders correctly with placeholder', () => {
    const { asFragment } = renderWithTheme(<TagInput placeholder="Enter a value here" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should renders correctly with some tags', () => {
    const { asFragment } = renderWithTheme(<TagInput name="radio" onChange={() => {}} value={['hello', 'world']} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should renders correctly with some tags objects', () => {
    const { asFragment } = renderWithTheme(
      <TagInput
        name="radio"
        onChange={() => {}}
        value={[
          { index: 'index', label: 'hello' },
          { index: 'secondIndex', label: 'world' },
        ]}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should be able to be controlled', async () => {
    const mockOnChange = vi.fn()

    renderWithTheme(<TagInput onChange={mockOnChange} value={['first']} />)
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, 'new ')
    expect(mockOnChange).toHaveBeenCalledWith(['first', 'new'])
  })

  it('should be clearable', async () => {
    const mockOnChange = vi.fn()

    renderWithTheme(<TagInput clearable onChange={mockOnChange} value={['first']} />)
    const clearableButton = screen.getByRole('button', { name: 'clear value' })
    await userEvent.click(clearableButton)
    expect(mockOnChange).toHaveBeenCalledWith([])
  })

  it('should delete tag', async () => {
    const mockOnChange = vi.fn()

    renderWithTheme(<TagInput onChange={mockOnChange} value={['first', 'second']} />)

    const firstTag = screen.queryByText('first')
    expect(firstTag).toBeInTheDocument()
    // remove Tag
    const tagsClose = screen.getAllByTestId('close-tag')
    const firstCloseTag = tagsClose[0]
    await userEvent.click(firstCloseTag)
    // check Tag was removed
    expect(firstTag).not.toBeInTheDocument()
    expect(mockOnChange).toHaveBeenCalledWith(['second'])
  })

  it('should delete tag with backspace', async () => {
    const mockOnChange = vi.fn()
    renderWithTheme(<TagInput id="test" name="radio" onChange={mockOnChange} value={['hello', 'world']} />)
    const input = screen.getByRole<HTMLInputElement>('textbox')
    const lastTag = screen.queryByText('world')
    expect(lastTag).toBeInTheDocument()
    await userEvent.click(input)
    expect(input).toHaveFocus()
    await userEvent.keyboard('{backspace}')
    expect(lastTag).not.toBeInTheDocument()
    expect(mockOnChange).toHaveBeenCalledWith(['hello'])
  })

  it('should not add tag on paste', async () => {
    const mockOnChange = vi.fn()
    renderWithTheme(<TagInput id="test" name="radio" onChange={mockOnChange} value={['hello', 'world']} />)
    const input = screen.getByRole<HTMLInputElement>('textbox')

    await userEvent.click(input)
    await userEvent.paste('test=')
    await userEvent.type(input, 'new ')

    expect(mockOnChange).toHaveBeenCalledWith(['hello', 'world', 'test=new'])
  })
})
