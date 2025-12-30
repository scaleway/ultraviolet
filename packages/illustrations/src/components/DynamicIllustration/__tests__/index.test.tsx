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
      consoleLightTheme,
    ))
  it('should work with consoleDarkTheme', () =>
    shouldMatchSnapshot(<DynamicIllustration name="empty" />, consoleDarkTheme))

  it('should work with consoleDarkerTheme', () =>
    shouldMatchSnapshot(
      <DynamicIllustration name="empty" />,
      consoleDarkerTheme,
    ))
})
