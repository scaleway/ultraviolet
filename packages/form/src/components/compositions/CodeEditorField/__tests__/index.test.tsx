import { renderWithForm } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { CodeEditorField } from '..'

describe('optionSelectorField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <CodeEditorField extensions="js" name="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <CodeEditorField disabled extensions="js" name="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
