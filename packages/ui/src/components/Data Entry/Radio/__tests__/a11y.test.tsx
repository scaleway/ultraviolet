import { screen } from '@testing-library/react'
import { consoleThemesMap } from '@ultraviolet/themes'
import { expectNoViolations, renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { Radio } from '..'

describe('radio - A11y', { tags: ['a11y'] }, () => {
  describe('axe checks', () => {
    it.for([...consoleThemesMap.entries()])('should not have violations (theme: %s)', async ([, currentTheme]) => {
      const { container } = renderWithTheme(
        <Radio checked label="Choice" name="radio" onChange={() => {}} value="choice" />,
        currentTheme,
      )
      await expectNoViolations(container)
    })
  })

  it('exposes the disabled state via aria-disabled', () => {
    renderWithTheme(<Radio disabled label="Choice" name="radio" onChange={() => {}} value="choice" />)
    expect(screen.getByRole('radio', { name: 'Choice' })).toHaveAttribute('aria-disabled', 'true')
  })

  it('exposes the error as an accessible description', () => {
    renderWithTheme(<Radio error="Invalid value" label="Choice" name="radio" onChange={() => {}} value="choice" />)
    expect(screen.getByRole('radio', { name: 'Choice' })).toHaveAccessibleDescription('Invalid value')
  })

  it('exposes the helper as an accessible description at small size', () => {
    renderWithTheme(
      <Radio helper="Helper" label="Choice" name="radio" onChange={() => {}} size="small" value="choice" />,
    )
    expect(screen.getByRole('radio', { name: 'Choice' })).toHaveAccessibleDescription('Helper')
  })
})
