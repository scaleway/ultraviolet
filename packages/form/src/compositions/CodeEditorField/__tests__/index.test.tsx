import { renderWithForm } from '@utils/test'
import { describe, expect, it } from 'vitest'

import { CodeEditorField } from '..'

describe('optionSelectorField', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <CodeEditorField extensions="js" name="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <CodeEditorField disabled extensions="js" name="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
