import type { theme as UVTheme } from '@ultraviolet/themes'
import {
  consoleDarkerTheme,
  consoleDarkTheme,
  consoleLightTheme,
} from '@ultraviolet/themes'
import { shouldMatchSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { DynamicIllustration } from '..'

describe('dynamicIllustration', () => {
  it('should work with consoleLightTheme', () =>
    shouldMatchSnapshot(
      <DynamicIllustration name="empty" />,
      consoleLightTheme as typeof UVTheme,
    ))
  it('should work with consoleDarkTheme', () =>
    shouldMatchSnapshot(
      <DynamicIllustration name="empty" />,
      consoleDarkTheme as typeof UVTheme,
    ))

  it('should work with consoleDarkerTheme', () =>
    shouldMatchSnapshot(
      <DynamicIllustration name="empty" />,
      consoleDarkerTheme as typeof UVTheme,
    ))
})
