import { describe, expect, it } from 'vitest'
import { CodeEditorField } from '..'
import { renderWithForm } from '../../../__tests__/helpers'

describe('optionSelectorField', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithForm(<CodeEditorField extensions="js" name="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(<CodeEditorField disabled extensions="js" name="test" />)
    expect(asFragment()).toMatchSnapshot()
  })
})
