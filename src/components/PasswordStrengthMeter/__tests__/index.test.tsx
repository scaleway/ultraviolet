import React from 'react'
import PasswordStrengthMeter from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('PasswordStrengthMeter', () => {
  test('render with empty password', () =>
    shouldMatchEmotionSnapshot(
      <PasswordStrengthMeter
        password=""
        strength={[
          { color: 'red', t: 'veryWeak' },
          { color: 'orange', t: 'weak' },
          { color: 'yellow', t: 'medium' },
          { color: 'green', t: 'strong' },
          { color: 'green', t: 'veryStrong' },
        ]}
        title="MyTitle"
      />,
    ))

  test('render with weak password', () =>
    shouldMatchEmotionSnapshot(
      <PasswordStrengthMeter
        password="weak"
        strength={[
          { color: 'red', t: 'veryWeak' },
          { color: 'orange', t: 'weak' },
          { color: 'yellow', t: 'medium' },
          { color: 'green', t: 'strong' },
          { color: 'green', t: 'veryStrong' },
        ]}
        title="MyTitle"
      />,
    ))

  test('render with medium password', () =>
    shouldMatchEmotionSnapshot(
      <PasswordStrengthMeter
        password="mediumpas"
        strength={[
          { color: 'red', t: 'veryWeak' },
          { color: 'orange', t: 'weak' },
          { color: 'yellow', t: 'medium' },
          { color: 'green', t: 'strong' },
          { color: 'green', t: 'veryStrong' },
        ]}
        title="MyTitle"
      />,
    ))

  test('render with strong password', () =>
    shouldMatchEmotionSnapshot(
      <PasswordStrengthMeter
        password="strongpass{"
        strength={[
          { color: 'red', t: 'veryWeak' },
          { color: 'orange', t: 'weak' },
          { color: 'yellow', t: 'medium' },
          { color: 'green', t: 'strong' },
          { color: 'green', t: 'veryStrong' },
        ]}
        title="MyTitle"
      />,
    ))

  test('render with very strong password', () =>
    shouldMatchEmotionSnapshot(
      <PasswordStrengthMeter
        password="verystrongpass{"
        strength={[
          { color: 'red', t: 'veryWeak' },
          { color: 'orange', t: 'weak' },
          { color: 'yellow', t: 'medium' },
          { color: 'green', t: 'strong' },
          { color: 'green', t: 'veryStrong' },
        ]}
        title="MyTitle"
      />,
    ))
})
