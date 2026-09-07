import { consoleThemesMap } from '@ultraviolet/themes'
import { expectNoViolations, renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { RadioGroup } from '..'

describe('radioGroup - A11y', { tags: ['a11y'] }, () => {
  describe('axe checks', () => {
    it.for([...consoleThemesMap.entries()])('should not have violations (theme: %s)', async ([, currentTheme]) => {
      const { container } = renderWithTheme(
        <RadioGroup legend="Group legend" name="radio" onChange={() => {}} value="value-1">
          <RadioGroup.Radio label="Radio 1" value="value-1" />
          <RadioGroup.Radio label="Radio 2" value="value-2" />
        </RadioGroup>,
        currentTheme,
      )
      await expectNoViolations(container)
    })
  })

  it('exposes the helper as an accessible description of the group', () => {
    const { container } = renderWithTheme(
      <RadioGroup helper="Helper content" legend="Group legend" name="radio" onChange={() => {}} value="value-1">
        <RadioGroup.Radio label="Radio 1" value="value-1" />
        <RadioGroup.Radio label="Radio 2" value="value-2" />
      </RadioGroup>,
    )
    expect(container.querySelector('fieldset')).toHaveAccessibleDescription('Helper content')
  })

  it('exposes the error as an accessible description of the group at small size', () => {
    const { container } = renderWithTheme(
      <RadioGroup
        error="Error content"
        legend="Group legend"
        name="radio"
        onChange={() => {}}
        size="small"
        value="value-1"
      >
        <RadioGroup.Radio label="Radio 1" value="value-1" />
        <RadioGroup.Radio label="Radio 2" value="value-2" />
      </RadioGroup>,
    )
    expect(container.querySelector('fieldset')).toHaveAccessibleDescription('Error content')
  })
})
