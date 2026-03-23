'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'

import { Text } from '../Text'

import { colorMeter, meterStyle } from './styles.css'

import type { CSSProperties } from 'react'

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
  style?: CSSProperties
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
  style,
  id,
}: PasswordStrengthMeterProps) => {
  const toValue = ((value + 1) / strength.length) * 100
  const width = `${toValue}%`

  const backgroundColor = strength[value]?.color ?? strength[0].color
  const text = strength[value]?.text ?? strength[0].text

  return (
    // oxlint-disable jsx_a11y/no-noninteractive-element-to-interactive-role: style issue
    <div
      aria-labelledby="meter-label"
      aria-live="polite"
      aria-valuemax={strength.length ?? 0}
      aria-valuemin={0}
      aria-valuenow={value}
      className={className}
      data-testid={dataTestId}
      id={id}
      role="meter"
      style={style}
      title={title}
    >
      <Text as="p" id="meter-label" variant="bodySmallStrong">
        {title}
        <Text
          as="span"
          className={meterStyle.strength}
          style={assignInlineVars({
            [colorMeter]: strength[value].color,
          })}
          variant="bodySmallStrong"
        >
          {text}
        </Text>
      </Text>
      <div className={meterStyle.wrapper}>
        <div
          className={meterStyle.meter}
          style={{
            backgroundColor,
            width,
          }}
        />
      </div>
    </div>
  )
}
