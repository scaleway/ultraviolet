import { useEffect, useState } from 'react'
import zxcvbn from 'zxcvbn'
import { Meter } from '..'
import { colors } from '../../../theme'
import { TextInput } from '../../TextInput'

const strength = [
  { color: colors.danger.text, text: 'veryWeak' },
  { color: colors.warning.text, text: 'weak' },
  { color: colors.warning.text, text: 'medium' },
  { color: colors.success.text, text: 'strong' },
  { color: colors.success.text, text: 'veryStrong' },
]

export const Playground = () => {
  const [value, setValue] = useState<number>(0)
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    if (password.length >= 1) {
      setValue(zxcvbn(password).score)
    }
  }, [password, setValue])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TextInput
        name="basic"
        label="Password"
        value={password}
        onChange={setPassword}
      />
      <Meter value={value} title="Password Strength" strength={strength} />
    </div>
  )
}
