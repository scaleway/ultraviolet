import styled from '@emotion/styled'
import type { JSX } from 'react'
import { Text } from '../Text'

const StyledStrength = styled(Text, {
  shouldForwardProp: prop => !['color'].includes(prop),
})<{ strength: Strength }>`
  float: right;
  vertical-align: top;
  color: ${({ strength }) => strength.color};
`

const StyledWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
  border-radius: ${({ theme }) => theme.radii.default};
  height: ${({ theme }) => theme.space['1']};
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
  text: string
}

type PasswordStrengthMeterProps = {
  /**
   * Strength is used for defining different color and text associated with it.
   */
  strength: Strength[]
  title: string
  value: number
  className?: string
  'data-testid'?: string
  id?: string
}

/**
 * Show strength of a password based on different criteria.
 */
export const Meter = ({
  strength,
  title,
  value,
  className,
  'data-testid': dataTestId,
  id,
}: PasswordStrengthMeterProps): JSX.Element => {
  const toValue = ((value + 1) / strength.length) * 100
  const width = `${toValue}%`

  const backgroundColor = strength[value]?.color ?? strength[0].color
  const text = strength[value]?.text ?? strength[0].text

  return (
    <div
      aria-live="polite"
      aria-valuemax={strength.length ?? 0}
      aria-valuemin={0}
      aria-valuenow={value}
      className={className}
      data-testid={dataTestId}
      id={id}
      role="meter"
      title={title}
      aria-labelledby="meter-label"
    >
      <Text id="meter-label" variant="bodySmallStrong" as="p">
        {title}
        <StyledStrength
          as="span"
          variant="bodySmallStrong"
          strength={strength[value]}
        >
          {text}
        </StyledStrength>
      </Text>

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
