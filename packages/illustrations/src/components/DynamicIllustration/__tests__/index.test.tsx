import {
  consoleDarkerTheme,
  consoleDarkTheme,
  consoleLightTheme,
} from '@ultraviolet/themes'
import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { DynamicIllustration } from '..'

describe('dynamicIllustration', () => {
  it('should work with consoleLightTheme', () =>
    shouldMatchEmotionSnapshot(
      <DynamicIllustration name="empty" />,
      consoleLightTheme,
    ))
  it('should work with consoleDarkTheme', () =>
    shouldMatchEmotionSnapshot(
      <DynamicIllustration name="empty" />,
      consoleDarkTheme,
    ))

  it('should work with consoleDarkerTheme', () =>
    shouldMatchEmotionSnapshot(
      <DynamicIllustration name="empty" />,
      consoleDarkerTheme,
    ))
})
