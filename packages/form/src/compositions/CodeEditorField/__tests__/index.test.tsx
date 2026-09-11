import { screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CodeEditorField } from '..'
import { renderWithForm } from '../../../__tests__/helpers'

describe('optionSelectorField', () => {
  it('should render correctly', async () => {
    const { asFragment } = renderWithForm(<CodeEditorField extensions="js" name="test" />)

    const textbox = screen.getByRole('textbox')
    expect(textbox).toBeVisible()
    await waitFor(() => expect(textbox).toHaveAttribute('data-language', 'javascript'))

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly disabled', async () => {
    const { asFragment } = renderWithForm(<CodeEditorField disabled extensions="js" name="test" />)

    const textbox = screen.getByRole('textbox')
    expect(textbox).toBeVisible()
    expect(textbox).toHaveAttribute('aria-readonly', 'true')
    await waitFor(() => expect(textbox).toHaveAttribute('data-language', 'javascript'))

    expect(asFragment()).toMatchSnapshot()
  })
})
