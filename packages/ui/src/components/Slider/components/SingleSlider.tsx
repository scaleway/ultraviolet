'use client'

import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { Label } from '../../Label'
import { NumberInput } from '../../NumberInput'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { THUMB_SIZE } from '../constant'
import { StyledTooltip, thumbStyle, trackStyle } from '../styles'
import type { SingleSliderProps } from '../types'
import { Options } from './Options'

const StyledTextValue = styled(Text, {
  shouldForwardProp: prop => !['double', 'isColumn'].includes(prop),
})<{ double: boolean; isColumn: boolean }>`
  min-width: ${({ theme, double, isColumn }) => (double && isColumn ? null : theme.space['5'])};
  align-self: ${({ double, isColumn }) => (double || !isColumn ? 'center' : 'end')};
`

const SliderElement = styled('input', {
  shouldForwardProp: prop => !['themeSlider', 'left'].includes(prop),
})<{ themeSlider: string; disabled: boolean; left: number }>`
    appearance: none;
    height: ${({ theme }) => theme.space['1']};
    width: 100%;
    position: relative;
    background-color: ${({ theme }) => theme.colors.neutral.borderWeak};

    border-radius: ${({ theme }) => theme.radii.default};
    background-image:linear-gradient(${({ theme }) => theme.colors.primary.border}, ${({ theme }) => theme.colors.primary.border});
    background-repeat: no-repeat;
    align-self: center;
    outline: none;

    &:focus {
        &::-moz-range-thumb {
          border: ${({ theme, disabled }) => (disabled ? null : `1.5px solid ${theme.colors.primary.border}`)};
          box-shadow: ${({ theme, disabled }) => (disabled ? null : theme.shadows.focusPrimary)};
        }

        &::-webkit-slider-thumb {
          border: ${({ theme, disabled }) => (disabled ? null : `1.5px solid ${theme.colors.primary.border}`)};
          box-shadow: ${({ theme, disabled }) => (disabled ? null : theme.shadows.focusPrimary)};
        }
  }
    &[data-error='true']{
        background-image:linear-gradient(${({ theme }) => theme.colors.danger.backgroundStrong}, ${({ theme }) => theme.colors.danger.backgroundStrong});
    }

    &[data-direction='column'] {
      align-self: baseline;
    }

    &[aria-disabled='true']{
      background-image:linear-gradient(${({ theme }) => theme.colors.primary.borderDisabled}, ${({ theme }) => theme.colors.primary.borderDisabled});
    }

    /* Mozilla */
    ::-moz-range-track {
        ${trackStyle}
    }
    ::-moz-range-thumb {
        ${({ theme, themeSlider, disabled, left }) => thumbStyle(theme, themeSlider, disabled, left, false)}
    }

    /* Other browsers */
    ::-webkit-slider-runnable-track {
        ${trackStyle}
    }
    ::-webkit-slider-thumb {
        ${({ theme, themeSlider, disabled, left }) => thumbStyle(theme, themeSlider, disabled, left, false)}
    }
`

const StyledNumberInput = styled(NumberInput)`
  min-width: ${({ theme }) => theme.space['5']};
`

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
  const { theme } = useTheme()
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
        value: index,
        label: element.label,
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
      <StyledNumberInput
        value={inputValue}
        size="small"
        min={min}
        aria-label="input"
        max={max}
        step={step}
        controls={false}
        disabled={disabled}
        data-testid={dataTestId ? `${dataTestId}-input` : 'slider-input'}
        unit={typeof suffix === 'string' ? suffix : unit}
        onChange={setInputValue}
        onBlur={event => {
          internalOnChange(Number.parseFloat(event.target.value))
        }}
      />
    ) : (
      <StyledTextValue
        as="span"
        variant="bodySmall"
        sentiment="neutral"
        placement={direction === 'column' ? 'right' : 'center'}
        double={false}
        isColumn={direction === 'column'}
        data-testid={dataTestId ? `${dataTestId}-value` : 'slider-value'}
      >
        {prefix}
        {valueNumber}
        {suffix ?? unit}
      </StyledTextValue>
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

  const valueToShow = options ? options[selectedIndex]?.value : selectedIndex

  return (
    <Stack gap={1} direction={direction} justifyContent="left">
      {label ? (
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
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
      <Stack direction="column" width="100%" gap={1} justifyContent="center">
        <StyledTooltip
          text={tooltipText}
          placement={tooltipPosition}
          left={placementTooltip}
        >
          <SliderElement
            type="range"
            value={selectedIndex}
            onChange={event => {
              internalOnChange(Number.parseFloat(event.target.value))
            }}
            min={min}
            max={max}
            tabIndex={0}
            step={step}
            name={name}
            disabled={!!disabled}
            aria-disabled={disabled}
            data-testid={dataTestId}
            id={finalId}
            onBlur={onBlur}
            onFocus={onFocus}
            aria-label={ariaLabel ?? name}
            className={className}
            style={getBackgroundSize}
            data-error={!!error}
            data-direction={direction}
            themeSlider={theme}
            ref={refSlider}
            left={leftPosition}
          />
        </StyledTooltip>
        {options ? (
          <Options
            ticks={ticks}
            min={min}
            max={max}
            sliderWidth={sliderWidth}
            value={selectedIndex}
            step={step}
          />
        ) : null}
      </Stack>
      {direction === 'row' ? styledValue(valueToShow) : null}
    </Stack>
  )
}
