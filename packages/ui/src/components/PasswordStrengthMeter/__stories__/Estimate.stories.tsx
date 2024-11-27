import { useState } from 'react'
import { colors } from '../../../theme'
import { TextInputV2 } from '../../TextInputV2'
import { PasswordStrengthMeter } from '../index'

type PasswordStrengthScore =
  | 'unknown_score'
  | 'very_weak'
  | 'weak'
  | 'medium'
  | 'strong'
  | 'very_strong'

type PasswordStrength = {
  score: PasswordStrengthScore
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
const defaultScore = 0 as const
const mapScoreValue = {
  unknown_score: 0,
  very_weak: 0,
  weak: 1,
  medium: 2,
  strong: 3,
  very_strong: 4,
} as const

const estimate = async (passwordToTest: string, userInputs: string[]) => {
  if (passwordToTest.length > 1) {
    const { score } = await fetch(
      'https://api.scaleway.com/account/v3/compute-password-strength',
      {
        body: JSON.stringify({
          password: passwordToTest,
          userInputs,
        }),
        headers: new Headers({
          'content-type': 'application/json',
        }),
        method: 'POST',
      },
    ).then(r => {
      if (!r.ok) {
        return r.json().then(json => {
          throw json
        })
      }

      return r.json() as Promise<PasswordStrength>
    })

    return { score: mapScoreValue[score] }
  }

  return { score: defaultScore }
}

export const Estimate = () => {
  const [value, setValue] = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TextInputV2
        name="basic"
        label="Password"
        value={value}
        onChangeValue={setValue}
      />

      <PasswordStrengthMeter
        password={value}
        estimate={estimate}
        title="Password Strength"
        strength={[
          { color: colors.danger.text, t: 'veryWeak' },
          { color: colors.warning.text, t: 'weak' },
          { color: colors.warning.text, t: 'medium' },
          { color: colors.success.text, t: 'strong' },
          { color: colors.success.text, t: 'veryStrong' },
        ]}
        forbiddenInputs={['qwerty']}
      />
    </div>
  )
}
