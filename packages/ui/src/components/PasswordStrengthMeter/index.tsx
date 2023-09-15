import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { JSX } from 'react'
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
  border-radius: ${({ theme }) => theme.radii.default};
  height: 8px;
  margin-top: ${({ theme }) => theme.space['1']};
  margin-bottom: ${({ theme }) => theme.space['2']};
`

const StyledMeter = styled.div`
  border-radius: ${({ theme }) => theme.radii.default};
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

type Score = 0 | 1 | 2 | 3 | 4

type ResponseEstimate = {
  score: Score
}

type PasswordStrengthMeterProps = {
  /**
   * A function that should return a score based on password (index of strength array). The higher score is the stronger password is.
   */
  estimate?:
    | ((
        passwordToTest: string,
        userInputs: string[],
      ) => Promise<ResponseEstimate>)
    | ((passwordToTest: string, userInputs: string[]) => ResponseEstimate)
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
  forbiddenInputs?: string[]
  className?: string
  'data-testid'?: string
}

const DEFAULT_ESTIMATE = () => ({ score: 0 as Score })
const DEFAULT_FORBIDDEN_WORDS: PasswordStrengthMeterProps['forbiddenInputs'] =
  []

/**
 * PasswordStrengthMeter is a component that displays a password strength meter.
 * @deprecated use Meter component instead
 */
export const PasswordStrengthMeter = ({
  password = '',
  onChange,
  strength,
  title,
  estimate = DEFAULT_ESTIMATE,
  forbiddenInputs = DEFAULT_FORBIDDEN_WORDS,
  className,
  'data-testid': dataTestId,
}: PasswordStrengthMeterProps): JSX.Element => {
  const [score, setScore] = useState<number>(0)
  const theme = useTheme()
  const [backgroundColor, setBackgroundColor] = useState<string>(
    strength[0]?.color || theme.colors.success.backgroundStrong,
  )
  const [width, setWidth] = useState<number | string>(0)

  const getScore = useCallback(
    async (passwordToTest: string) => {
      const { score: internalScore = 0 } = await estimate(
        passwordToTest || '',
        forbiddenInputs,
      )

      return internalScore
    },
    [estimate, forbiddenInputs],
  )

  const handleChange = useCallback((e: number) => onChange?.(e), [onChange])

  useEffect(() => {
    setBackgroundColor(strength[score].color)
    handleChange(score)
    getScore(password)
      .then(s => setScore(s))
      .catch(null)

    const toValue = ((score + 1) / strength.length) * 100
    setWidth(`${toValue}%`)
  }, [getScore, handleChange, password, score, strength])

  return (
    <div
      title={title}
      role="alert"
      aria-live="polite"
      className={className}
      data-testid={dataTestId}
    >
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
