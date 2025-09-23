'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { ReactNode } from 'react'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Text } from '../Text'
import type { PROGRESS_BAR_SENTIMENTS } from './constants'
import {
  customText,
  filledBarSentiments,
  progressBar,
  progressContainer,
} from './styles.css'
import { percentageValue } from './variables.css'

type ProgressBarProps = {
  sentiment?: (typeof PROGRESS_BAR_SENTIMENTS)[number]
  value?: number
  showProgress?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
  max?: number
  label?: string
  labelDescription?: ReactNode
  direction?: 'column' | 'row'
  /** Put ProgressBar in a loading state */
  progress?: boolean
  className?: string
  'data-testid'?: string
  'aria-labelledby'?: string
  'aria-label'?: string
}

/**
 * Progress bar component to display progress of a task. Can be used to display progress of a form or a loading state.
 */
export const ProgressBar = ({
  progress = false,
  value = 0,
  sentiment = 'primary',
  className,
  'data-testid': dataTestId,
  showProgress = false,
  prefix,
  suffix = '%',
  max = 100,
  label,
  labelDescription,
  direction = 'column',
  'aria-labelledby': ariaLabelledBy,
  'aria-label': ariaLabel,
}: ProgressBarProps) => (
  <Stack
    alignItems="center"
    direction={direction}
    gap={direction === 'column' ? 1 : 2}
  >
    {direction === 'column' && (label || showProgress) ? (
      <Stack
        direction="row"
        justifyContent={!label && showProgress ? 'right' : 'space-between'}
        width="100%"
      >
        <Label labelDescription={labelDescription} size="medium">
          {label}
        </Label>
        {showProgress ? (
          <Text
            as="label"
            placement="right"
            sentiment="neutral"
            variant="bodySmall"
          >
            {prefix}
            {suffix === '%' ? (100 * value) / max : value}
            {suffix}
          </Text>
        ) : null}
      </Stack>
    ) : null}

    {direction === 'row' && label ? (
      <Label labelDescription={labelDescription} size="medium">
        {label}
      </Label>
    ) : null}

    <div
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-valuemax={max}
      aria-valuemin={0}
      aria-valuenow={value}
      className={`${className ? `${className} ` : ''}${progressContainer}`}
      data-testid={dataTestId}
      role="progressbar"
    >
      {progress ? (
        <div className={progressBar} />
      ) : (
        <div
          className={filledBarSentiments[sentiment]}
          style={assignInlineVars({
            [percentageValue]: `${(100 * Math.max(0, Math.min(max, value))) / max}%`,
          })}
        />
      )}
    </div>
    {showProgress && direction === 'row' ? (
      <Stack direction="row" gap={1} width="fit-content">
        <Text
          as="label"
          className={customText}
          sentiment="neutral"
          variant="bodySmall"
        >
          {prefix}
          {suffix === '%' ? (100 * value) / max : value}
          {suffix}
        </Text>
      </Stack>
    ) : null}
  </Stack>
)
