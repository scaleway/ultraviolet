import React from 'react'
import PasswordStrengthMeter from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import { colors } from '../../../theme'

describe('PasswordStrengthMeter', () => {
  const strengthLevels = [
    { color: colors.danger.text, t: 'veryWeak' },
    { color: colors.warning.text, t: 'weak' },
    { color: 'yellow', t: 'medium' },
    { color: colors.success.text, t: 'strong' },
    { color: colors.success.text, t: 'veryStrong' },
  ]

  test('render with empty password', () =>
    shouldMatchEmotionSnapshot(
      <PasswordStrengthMeter
        password=""
        strength={strengthLevels}
        title="MyTitle"
      />,
    ))

  test('render with weak password', () =>
    shouldMatchEmotionSnapshot(
      <PasswordStrengthMeter
        password="weak"
        strength={strengthLevels}
        title="MyTitle"
      />,
    ))

  test('render with medium password', () =>
    shouldMatchEmotionSnapshot(
      <PasswordStrengthMeter
        password="mediumpas"
        strength={strengthLevels}
        title="MyTitle"
      />,
    ))

  test('render with strong password', () =>
    shouldMatchEmotionSnapshot(
      <PasswordStrengthMeter
        password="strongpass{"
        strength={strengthLevels}
        title="MyTitle"
      />,
    ))

  test('render with very strong password', () =>
    shouldMatchEmotionSnapshot(
      <PasswordStrengthMeter
        password="verystrongpass{"
        strength={strengthLevels}
        title="MyTitle"
      />,
    ))
})
