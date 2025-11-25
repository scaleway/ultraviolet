import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { TagInput } from '..'

describe('tagInput', () => {
  it('should renders correctly', () =>
    shouldMatchSnapshot(<TagInput onChange={() => {}} />))

  it('should renders correctly disabled', () =>
    shouldMatchSnapshot(<TagInput disabled />))

  it('should renders correctly readOnly', () =>
    shouldMatchSnapshot(<TagInput readOnly />))

  it('should renders correctly with label', () =>
    shouldMatchSnapshot(<TagInput label="Label" />))

  it('should renders correctly with labelDescription', () =>
    shouldMatchSnapshot(
      <TagInput labelDescription={<div>label description</div>} />,
    ))

  it('should renders correctly with error', () =>
    shouldMatchSnapshot(<TagInput error="This is an error" />))

  it('should renders correctly with success', () =>
    shouldMatchSnapshot(<TagInput success="This is a success" />))

  it('should renders correctly with placeholder', () =>
    shouldMatchSnapshot(<TagInput placeholder="Enter a value here" />))

  it('should renders correctly with some tags', () =>
    shouldMatchSnapshot(
      <TagInput name="radio" onChange={() => {}} value={['hello', 'world']} />,
    ))

  it('should renders correctly with some tags objects', () =>
    shouldMatchSnapshot(
      <TagInput
        name="radio"
        onChange={() => {}}
        value={[
          { index: 'index', label: 'hello' },
          { index: 'secondIndex', label: 'world' },
        ]}
      />,
    ))

  it('should be able to be controlled', async () => {
    const mockOnChange = vi.fn()

    renderWithTheme(<TagInput onChange={mockOnChange} value={['first']} />)
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, 'new ')
    expect(mockOnChange).toHaveBeenCalledWith(['first', 'new'])
  })

  it('should be clearable', async () => {
    const mockOnChange = vi.fn()

    renderWithTheme(
      <TagInput clearable onChange={mockOnChange} value={['first']} />,
    )
    const clearableButton = screen.getByLabelText('clear value')
    await userEvent.click(clearableButton)
    expect(mockOnChange).toHaveBeenCalledWith([])
  })

  it('should delete tag', async () => {
    const mockOnChange = vi.fn()

    renderWithTheme(
      <TagInput onChange={mockOnChange} value={['first', 'second']} />,
    )

    const firstTag = screen.queryByText(/first/)
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
    renderWithTheme(
      <TagInput
        id="test"
        name="radio"
        onChange={mockOnChange}
        value={['hello', 'world']}
      />,
    )
    const input = screen.getByRole<HTMLInputElement>('textbox')
    const lastTag = screen.queryByText(/world/)
    expect(lastTag).toBeInTheDocument()
    await userEvent.click(input)
    expect(input).toHaveFocus()
    await userEvent.keyboard('{backspace}')
    expect(lastTag).not.toBeInTheDocument()
    expect(mockOnChange).toHaveBeenCalledWith(['hello'])
  })

  it('should not add tag on paste', async () => {
    const mockOnChange = vi.fn()
    renderWithTheme(
      <TagInput
        id="test"
        name="radio"
        onChange={mockOnChange}
        value={['hello', 'world']}
      />,
    )
    const input = screen.getByRole<HTMLInputElement>('textbox')

    await userEvent.click(input)
    await userEvent.paste('test=')
    await userEvent.type(input, 'new ')

    expect(mockOnChange).toHaveBeenCalledWith(['hello', 'world', 'test=new'])
  })
})
