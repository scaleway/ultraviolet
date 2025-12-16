'use client'

import { cn, useTheme } from '@ultraviolet/themes'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { Label } from '../../Label'
import { NumberInput } from '../../NumberInput'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Tooltip } from '../../Tooltip'
import { THUMB_SIZE } from '../constant'
import {
  leftVar,
  sliderDoubleText,
  sliderNumberInput,
  sliderSingle,
  sliderThumbStyle,
  sliderTooltip,
  thumbColor,
  tooltipLeft,
} from '../styles.css'
import type { SingleSliderProps } from '../types'
import { Options } from './Options'

export const SingleSlider = ({
  name,
  tooltip,
  direction,
  disabled,
  error,
  'data-testid': dataTestId,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  id,
  onBlur,
  unit,
  options,
  onFocus,
  className,
  label,
  input,
  prefix,
  suffix,
  required,
  'aria-label': ariaLabel,
  tooltipPosition,
}: SingleSliderProps) => {
  const localId = useId()
  const theme = useTheme()
  const finalId = id ?? localId
  const safeValue = value ?? min
  const [selectedIndex, setSelectedIndex] = useState(safeValue)
  const refSlider = useRef<HTMLInputElement>(null)
  const [sliderWidth, setWidth] = useState(0)
  const [inputValue, setInputValue] = useState<number | null>(safeValue)

  useEffect(() => {
    setInputValue(selectedIndex)
  }, [selectedIndex])

  useEffect(() => {
    setWidth(Number(refSlider.current?.offsetWidth))
  }, [refSlider])

  const ticks = useMemo(() => {
    if (options) {
      return options.map((element, index) => ({
        label: element.label,
        value: index,
      }))
    }

    return []
  }, [options])

  const internalOnChange = useCallback(
    (newValue: number) => {
      if (!newValue) {
        setSelectedIndex(min)
        onChange?.(min)
      } else if (newValue < min) {
        setSelectedIndex(min)
        onChange?.(min)
      } else if (newValue > max) {
        setSelectedIndex(max)
        onChange?.(max)
      } else {
        setSelectedIndex(newValue)
        onChange?.(newValue)
      }
    },
    [max, min, onChange],
  )

  // Make sure that min <= value <= max
  useEffect(() => {
    if (value < min) {
      internalOnChange(min)
    } else if (value > max) {
      internalOnChange(max)
    } else {
      setSelectedIndex(() => value ?? min)
    }
  }, [value, max, min, internalOnChange])

  // Get slider size
  useEffect(() => {
    const setWidthResize = () => {
      setWidth(Number(refSlider.current?.offsetWidth))
    }
    window.addEventListener('resize', setWidthResize)

    return () => {
      window.removeEventListener('resize', setWidthResize)
    }
  }, [])

  const leftPosition = useMemo(
    () => ((selectedIndex - min) * 100) / (max - min),
    [selectedIndex, max, min],
  )

  const getBackgroundSize = useMemo(
    () => ({
      backgroundSize: `${leftPosition}% 100%`,
    }),
    [leftPosition],
  )

  const styledValue = (valueNumber: string | number | null) =>
    input && !options ? (
      <NumberInput
        aria-label="input"
        className={sliderNumberInput}
        controls={false}
        data-testid={dataTestId ? `${dataTestId}-input` : 'slider-input'}
        disabled={disabled}
        max={max}
        min={min}
        onBlur={event => {
          internalOnChange(Number.parseFloat(event.target.value))
        }}
        onChange={setInputValue}
        size="small"
        step={step}
        unit={typeof suffix === 'string' ? suffix : unit}
        value={inputValue}
      />
    ) : (
      <Text
        as="span"
        className={sliderDoubleText({
          isDouble: direction !== 'column',
          isPadded: direction === 'column',
        })}
        data-testid={dataTestId ? `${dataTestId}-value` : 'slider-value'}
        placement={direction === 'column' ? 'right' : 'center'}
        sentiment="neutral"
        variant="bodySmall"
      >
        {prefix}
        {valueNumber}
        {suffix ?? unit}
      </Text>
    )

  const tooltipText = useMemo(() => {
    if (tooltip === true) {
      return selectedIndex
    }
    if (tooltip) {
      return tooltip
    }

    return undefined
  }, [tooltip, selectedIndex])

  const placementTooltip =
    ((selectedIndex - min) / (max - min)) * (sliderWidth - THUMB_SIZE) +
    THUMB_SIZE / 2 -
    sliderWidth / 2

  const valueToShow = options?.[selectedIndex]
    ? options[selectedIndex].value
    : selectedIndex

  return (
    <Stack direction={direction} gap={1} justifyContent="left">
      {label ? (
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          <Label htmlFor={finalId} required={required}>
            {label}
          </Label>
          {direction === 'column' ? styledValue(valueToShow) : null}
        </Stack>
      ) : null}

      <Stack direction="row" justifyContent="end">
        {direction === 'column' && !label ? styledValue(valueToShow) : null}
      </Stack>
      <Stack direction="column" gap={1} justifyContent="center" width="100%">
        <Tooltip
          className={sliderTooltip}
          placement={tooltipPosition}
          style={assignInlineVars({
            [tooltipLeft]: `${placementTooltip}px`,
          })}
          text={tooltipText}
        >
          <input
            aria-disabled={disabled}
            aria-label={ariaLabel ?? name}
            className={cn(
              className,
              sliderSingle({ direction, disabled, error: !!error }),
              sliderThumbStyle({ disabled, isDouble: false }),
            )}
            data-direction={direction}
            data-error={!!error}
            data-testid={dataTestId}
            disabled={!!disabled}
            id={finalId}
            max={max}
            min={min}
            name={name}
            onBlur={onBlur}
            onChange={event => {
              internalOnChange(Number.parseFloat(event.target.value))
            }}
            onFocus={onFocus}
            ref={refSlider}
            step={step}
            style={{
              ...assignInlineVars({
                [leftVar]: `calc(${leftPosition}% - ${THUMB_SIZE / 2}px)`,
                [thumbColor]:
                  theme.theme === 'light'
                    ? theme.colors.neutral.background
                    : theme.colors.neutral.backgroundStronger,
              }),
              ...getBackgroundSize,
            }}
            tabIndex={0}
            type="range"
            value={selectedIndex}
          />
        </Tooltip>
        {options ? (
          <Options
            max={max}
            min={min}
            step={step}
            ticks={ticks}
            value={selectedIndex}
          />
        ) : null}
      </Stack>
      {direction === 'row' ? styledValue(valueToShow) : null}
    </Stack>
  )
}
