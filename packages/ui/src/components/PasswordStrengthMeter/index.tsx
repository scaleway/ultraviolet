import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { useCallback, useEffect, useState } from 'react'
import { Text } from '../Text'

const StyledTitle = styled(Text)`
  display: inline-block;
  vertical-align: top;
  line-height: 22px;
`

const StyledStrength = styled(Text)<{ strength: Strength }>`
  float: right;
  vertical-align: top;
  color: ${({ strength }) => strength.color};
`

const StyledWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
  border-radius: 5px;
  height: 8px;
  margin-top: ${({ theme }) => theme.space['1']};
  margin-bottom: ${({ theme }) => theme.space['2']};
`

const StyledMeter = styled.div`
  border-radius: 5px;
  height: 100%;
  transition: all 0.5s;
`

type Strength = {
  /**
   * Color to display
   */
  color: string
  /**
   * Text to display
   */
  t: string
}

type PasswordStrengthMeterProps = {
  /**
   * A function that should return a score based on password (index of strength array). The higher score is the stronger password is.
   */
  estimate?: (passwordToTest: string, userInputs: string[]) => { score: number }
  onChange?: (score: number) => unknown
  password?: string
  /**
   * Strength is used for defining different color and text associated with it.
   */
  strength: Strength[]
  title: string
  /**
   * An array of string that defines what word shouldn't be used in the password.
   */
  userInputs?: string[]
}

export const PasswordStrengthMeter = ({
  password = '',
  onChange,
  strength,
  title,
  estimate = () => ({ score: 0 }),
  userInputs = [],
}: PasswordStrengthMeterProps): JSX.Element => {
  const [score, setScore] = useState<number>(0)
  const theme = useTheme()
  const [backgroundColor, setBackgroundColor] = useState<string>(
    strength[0]?.color || theme.colors.success.backgroundStrong,
  )
  const [width, setWidth] = useState<number | string>(0)

  const getScore = useCallback(
    (passwordToTest: string) =>
      estimate(passwordToTest || '', userInputs)?.score || 0,
    [estimate, userInputs],
  )

  const handleChange = useCallback((e: number) => onChange?.(e), [onChange])

  useEffect(() => {
    setBackgroundColor(strength[score].color)
    handleChange(score)
    setScore(getScore(password))

    const toValue = ((score + 1) / strength.length) * 100
    setWidth(`${toValue}%`)
  }, [getScore, handleChange, password, score, strength])

  return (
    <div title={title} role="alert" aria-live="polite">
      <StyledTitle variant="bodySmallStrong" as="p">
        {title}
      </StyledTitle>

      <StyledStrength
        as="span"
        variant="bodySmallStrong"
        strength={strength[score]}
      >
        {strength[score]?.t}
      </StyledStrength>

      <StyledWrapper>
        <StyledMeter
          style={{
            backgroundColor,
            width,
          }}
        />
      </StyledWrapper>
    </div>
  )
}
