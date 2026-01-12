'use client'

import { useTheme } from '@ultraviolet/themes'
import { cn } from '@ultraviolet/utils'
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
  sliderCustomRail,
  sliderDouble,
  sliderDoubleText,
  sliderDoubleWrapper,
  sliderInnerRail,
  sliderThumbStyle,
  sliderTooltip,
  thumbColor,
  tooltipLeft,
} from '../styles.css'
import type { DoubleSliderProps } from '../types'
import { Options } from './Options'

export const DoubleSlider = ({
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
  onFocus,
  options,
  unit,
  label,
  className,
  input,
  prefix,
  suffix,
  required,
  tooltipPosition,
  'aria-label': ariaLabel,
  labelDescription,
  customValueDisplay,
}: DoubleSliderProps) => {
  const theme = useTheme()
  const localId = useId()
  const finalId = id ?? localId
  const refSlider = useRef<HTMLInputElement>(null)

  const safeValue =
    value && Array.isArray(value) && value.length === 2
      ? value
      : [min ?? 0, max ?? 1]
  const [selectedIndexes, setSelectedIndexes] = useState(safeValue)
  const [sliderWidth, setWidth] = useState(0)
  const [inputValue, setInputValue] = useState<(number | null)[]>(safeValue)

  useEffect(() => {
    setInputValue(selectedIndexes)
  }, [selectedIndexes])

  useEffect(() => {
    setWidth(Number(refSlider.current?.offsetWidth))
  }, [refSlider])

  const activeValue = (side: 'left' | 'right') => {
    // Find the index of the min value (if side="left") and max value (side="right")
    if (side === 'left') {
      if (selectedIndexes[0] === null) {
        return 0
      }
      if (
        selectedIndexes[1] !== null &&
        selectedIndexes[1] < selectedIndexes[0]
      ) {
        return 1
      }

      return 0
    }

    if (selectedIndexes[1] === null) {
      return 1
    }
    if (
      selectedIndexes[0] !== null &&
      selectedIndexes[1] < selectedIndexes[0]
    ) {
      return 0
    }

    return 1
  }

  const ticks = useMemo(() => {
    if (options) {
      return options.map((element, index) => ({
        label: element.label,
        value: index,
      }))
    }

    return []
  }, [options])

  const internalOnChangeRef = useCallback(
    (localValue: (number | null)[]) => {
      let leftSliderValue = localValue[0] === null ? min : localValue[0]
      let rightSliderValue = localValue[1] === null ? max : localValue[1]

      leftSliderValue = Math.max(min, Math.min(leftSliderValue, max))
      rightSliderValue = Math.max(min, Math.min(rightSliderValue, max))

      const newValues = [leftSliderValue, rightSliderValue]

      setSelectedIndexes(newValues)
      onChange?.([Math.min(...newValues), Math.max(...newValues)])
    },
    [max, min, onChange],
  )

  // Get slider size (for options)
  useEffect(() => {
    const setWidthResize = () => {
      setWidth(Number(refSlider.current?.offsetWidth))
    }
    window.addEventListener('resize', setWidthResize)

    return () => {
      window.removeEventListener('resize', setWidthResize)
    }
  }, [])

  const handleMinChange = (newValue: number) => {
    internalOnChangeRef([newValue, selectedIndexes[1]])
  }

  const handleMaxChange = (newValue: number) => {
    internalOnChangeRef([selectedIndexes[0], newValue])
  }

  const handleChangeInput = (val: number | null, side?: 'left' | 'right') => {
    if (side === 'left') {
      setInputValue([val, selectedIndexes[1]])
    } else if (side === 'right') {
      setInputValue([selectedIndexes[0], val])
    }
  }

  const styledValue = (
    valueNumber: string | number | null,
    side?: 'left' | 'right',
  ) =>
    input && !options ? (
      <NumberInput
        aria-label={`input-${side}`}
        controls={false}
        data-testid={side ? `slider-input-${side}` : 'slider-input'}
        disabled={disabled}
        max={max}
        min={min}
        onBlur={event => {
          // Default to min/max when the input is left empty
          if (event.target.value) {
            const newValue = Number.parseFloat(event.target.value)
            if (side === 'left') {
              internalOnChangeRef([newValue, selectedIndexes[1]])
            } else if (side === 'right') {
              internalOnChangeRef([selectedIndexes[0], newValue])
            }
          } else {
            if (side === 'left') {
              const index = activeValue('left')
              if (index === 0) {
                internalOnChangeRef([min, selectedIndexes[1]])
              } else {
                internalOnChangeRef([selectedIndexes[0], max])
              }
            }

            if (side === 'right') {
              const index = activeValue('right')
              if (index === 0) {
                internalOnChangeRef([min, selectedIndexes[1]])
              } else {
                internalOnChangeRef([selectedIndexes[0], max])
              }
            }
          }
        }}
        onChange={newVal => {
          handleChangeInput(newVal, side)
        }}
        size="small"
        step={step}
        unit={typeof suffix === 'string' ? suffix : unit}
        value={side === 'left' ? inputValue?.[0] : inputValue?.[1]}
      />
    ) : (
      <Text
        as="span"
        className={sliderDoubleText({
          isDouble: true,
          isPadded: direction !== 'column',
        })}
        data-testid={
          dataTestId ? `${dataTestId}-value-${side}` : `value-${side}`
        }
        placement={direction !== 'row' ? 'right' : 'center'}
        sentiment="neutral"
        variant="bodySmall"
      >
        {prefix}
        {valueNumber}
        {suffix ? suffix[side === 'left' ? 0 : 1] : unit}
      </Text>
    )

  // Position of the sliders to look like one range slider
  const minPos = ((Math.min(...selectedIndexes) - min) * 100) / (max - min)
  const maxPos = ((Math.max(...selectedIndexes) - min) * 100) / (max - min)

  const tooltipText = useMemo(() => {
    if (tooltip === true) {
      return [Math.min(...selectedIndexes), Math.max(...selectedIndexes)]
    }
    if (Array.isArray(tooltip)) {
      return tooltip
    }

    if (typeof tooltip === 'string') {
      return tooltip
    }

    return [null, null]
  }, [tooltip, selectedIndexes])

  const placementTooltip = [
    ((selectedIndexes[0] - min) / (max - min)) * (sliderWidth - THUMB_SIZE) +
      THUMB_SIZE / 2,
    ((selectedIndexes[1] - min) / (max - min)) * (sliderWidth - THUMB_SIZE) +
      THUMB_SIZE / 2,
  ]

  const [leftToShow, rightToShow] = options
    ? [options[selectedIndexes[0]].value, options[selectedIndexes[1]].value]
    : selectedIndexes

  // Make the component controllable
  useEffect(() => {
    setSelectedIndexes(() => {
      const newSafeValue =
        value && Array.isArray(value) && value.length === 2 ? value : [min, max]
      if (min > newSafeValue[0]) {
        newSafeValue[0] = min
      }
      if (max < newSafeValue[1]) {
        newSafeValue[1] = max
      }

      return newSafeValue
    })
  }, [min, max, value])

  return (
    <Stack direction="column" gap={1} justifyContent="left">
      {label ? (
        <Stack direction="row" justifyContent="space-between">
          <Label
            htmlFor={finalId}
            labelDescription={labelDescription}
            required={required}
          >
            {label}
          </Label>
          {customValueDisplay}
        </Stack>
      ) : null}
      <Stack direction={direction} gap={1} width="100%">
        {direction === 'column' ? (
          <Stack direction="row" justifyContent="space-between">
            {styledValue(leftToShow, 'left')}
            {styledValue(rightToShow, 'right')}
          </Stack>
        ) : null}
        {direction === 'row' ? styledValue(leftToShow, 'left') : null}
        <div className={sliderDoubleWrapper}>
          <Tooltip
            className={sliderTooltip}
            placement={tooltipPosition}
            style={assignInlineVars({
              [tooltipLeft]: `${(placementTooltip[0] + placementTooltip[1]) / 2}px`,
            })}
            text={typeof tooltipText === 'string' ? tooltipText : undefined}
          >
            <div className={sliderCustomRail}>
              <div
                aria-disabled={!!disabled}
                className={sliderInnerRail({
                  disabled: !!disabled,
                  error: !!error,
                })}
                data-error={!!error}
                style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
              />
            </div>

            <Tooltip
              className={sliderTooltip}
              placement={tooltipPosition}
              style={assignInlineVars({
                [tooltipLeft]: `${placementTooltip[0]}px`,
              })}
              text={Array.isArray(tooltipText) ? tooltipText[0] : undefined}
            >
              <input
                aria-label={ariaLabel ?? name}
                className={cn(
                  className,
                  sliderDouble({ disabled, hasTooltip: !!tooltip }),
                  sliderThumbStyle({
                    disabled: !!disabled,
                    hasTooltipDouble: !!tooltip,
                    isDouble: true,
                  }),
                )}
                data-direction={direction}
                data-error={error}
                data-testid={dataTestId ? `${dataTestId}-left` : 'handle-left'}
                disabled={!!disabled}
                id={finalId}
                max={max}
                min={min}
                name={name}
                onBlur={onBlur}
                onChange={event => {
                  event.preventDefault()
                  handleMinChange(Number.parseFloat(event.target.value))
                }}
                onFocus={onFocus}
                ref={refSlider}
                step={step}
                style={assignInlineVars({
                  [leftVar]: `calc(${((selectedIndexes[0] - min) * 100) / (max - min)}% - ${THUMB_SIZE / 2}px`,
                  [thumbColor]:
                    theme.theme === 'light'
                      ? theme.colors.neutral.background
                      : theme.colors.neutral.backgroundStronger,
                })}
                type="range"
                value={selectedIndexes[0]}
              />
            </Tooltip>
            <Tooltip
              className={sliderTooltip}
              placement={tooltipPosition}
              style={assignInlineVars({
                [tooltipLeft]: `${placementTooltip[1]}px`,
              })}
              text={Array.isArray(tooltipText) ? tooltipText[1] : undefined}
            >
              <input
                aria-label={ariaLabel ?? name}
                className={cn(
                  className,
                  sliderDouble({ disabled, hasTooltip: !!tooltip }),
                  sliderThumbStyle({
                    disabled,
                    hasTooltipDouble: !!tooltip,
                    isDouble: true,
                  }),
                )}
                data-direction={direction}
                data-error={error}
                data-testid={
                  dataTestId ? `${dataTestId}-right` : 'handle-right'
                }
                disabled={!!disabled}
                id={finalId}
                max={max}
                min={min}
                name={name}
                onBlur={onBlur}
                onChange={event => {
                  event.preventDefault()
                  handleMaxChange(Number.parseFloat(event.target.value))
                }}
                onFocus={onFocus}
                step={step}
                style={assignInlineVars({
                  [leftVar]: `calc(${(((selectedIndexes[1] ?? 0) - min) * 100) / (max - min)}% - ${THUMB_SIZE / 2}px`,
                  [thumbColor]:
                    theme.theme === 'light'
                      ? theme.colors.neutral.background
                      : theme.colors.neutral.backgroundStronger,
                })}
                type="range"
                value={selectedIndexes[1]}
              />
            </Tooltip>
          </Tooltip>
          {options ? (
            <Options
              max={max}
              min={min}
              step={step}
              ticks={ticks}
              value={selectedIndexes}
            />
          ) : null}
        </div>
        {direction === 'row' ? styledValue(rightToShow, 'right') : null}
      </Stack>
    </Stack>
  )
}
