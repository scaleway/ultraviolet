import { MinusIcon } from '@ultraviolet/icons/MinusIcon'
import { PlusIcon } from '@ultraviolet/icons/PlusIcon'
import { useCallback } from 'react'

import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { numberInputStyle } from '../styles.css'

import type { SIZES } from '../constant'
import type { RefObject } from 'react'

export const Controls = ({
  controls,
  direction,
  size,
  localRef,
  max,
  min,
  onChange,
  isDisabledOrReadOnly,
}: {
  controls?: boolean
  direction: 'up' | 'down'
  size: keyof typeof SIZES
  localRef: RefObject<HTMLInputElement | null>
  max?: number
  min?: number
  isDisabledOrReadOnly?: boolean
  onChange?: (newValue: number | null) => void
}) => {
  const isUp = direction === 'up'
  const isPlusDisabled = useCallback(() => {
    if (!localRef?.current?.value || localRef?.current?.value === '') {
      return false
    }

    const numericValue = Number(localRef?.current?.value)
    if (Number.isNaN(numericValue)) {
      return false
    }

    const maxValue = typeof max === 'number' ? max : Number(max)

    return numericValue >= maxValue
  }, [localRef?.current?.value, max])

  const isMinusDisabled = useCallback(() => {
    if (!localRef?.current?.value || localRef?.current?.value === '') {
      return false
    }

    const numericValue = Number(localRef?.current?.value)
    if (Number.isNaN(numericValue)) {
      return false
    }

    const minValue = typeof min === 'number' ? min : Number(min)

    return Number.isNaN(numericValue) || numericValue <= minValue
  }, [localRef?.current?.value, min])

  const onClickSideButton = useCallback(() => {
    if (direction === 'up') {
      localRef.current?.stepUp()
    } else if (direction === 'down') {
      localRef.current?.stepDown()
    }
    onChange?.(Number.parseFloat(localRef.current?.value ?? '') ?? min)
  }, [localRef, min, onChange, direction])

  const isDisabled = isUp ? isPlusDisabled() : isMinusDisabled()

  return controls ? (
    <Stack
      alignItems="center"
      className={numberInputStyle.sideContainer[size]}
      data-size={size}
      justifyContent="center"
    >
      <Button
        aria-label={isUp ? 'plus' : 'minus'}
        disabled={isDisabledOrReadOnly || isDisabled}
        onClick={onClickSideButton}
        sentiment="neutral"
        size={size === 'small' ? 'xsmall' : 'small'}
        variant="ghost"
      >
        {isUp ? (
          <PlusIcon size={size === 'large' ? 'small' : 'small'} />
        ) : (
          <MinusIcon size={size === 'large' ? 'small' : 'small'} />
        )}
      </Button>
    </Stack>
  ) : null
}
