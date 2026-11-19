import { describe, expect, it } from 'vitest'
import { DynamicIllustration } from '..'
import { renderWithTheme } from '../../../__tests__/helpers'

describe('dynamicIllustration', () => {
  it('should work with consoleLightTheme', () => {
    const { asFragment } = renderWithTheme(<DynamicIllustration name="empty" />, 'light')
    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with consoleDarkTheme', () => {
    const { asFragment } = renderWithTheme(<DynamicIllustration name="empty" />, 'dark')
    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with consoleDarkerTheme', () => {
    const { asFragment } = renderWithTheme(<DynamicIllustration name="empty" />, 'darker')
    expect(asFragment()).toMatchSnapshot()
  })
})
