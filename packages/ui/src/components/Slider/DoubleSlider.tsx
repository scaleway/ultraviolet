import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Label } from './Label'
import { Options } from './Options'
import { SLIDER_WIDTH, THUMB_SIZE } from './constant'
import {
  StyledNumberInput,
  StyledTooltip,
  thumbStyle,
  trackStyle,
} from './styles'
import type { DoubleSliderProps } from './types'

const StyledTextValue = styled(Text, {
  shouldForwardProp: prop => !['double', 'isColumn'].includes(prop),
})<{ double: boolean; isColumn: boolean }>`
  min-width: ${({ theme, double, isColumn }) => (double && isColumn ? null : theme.space['5'])};
  align-self: ${({ double }) => (double ? 'center' : 'end')};
`

const SliderElement = styled('input', {
  shouldForwardProp: prop => !['themeSlider', 'suffix'].includes(prop),
})<{ themeSlider: string; disabled: boolean; suffix: boolean }>`
  position: absolute;
  width: 100%;
  pointer-events: none;
  appearance: none;
  height: 100%;
  padding: 0;
  background: transparent;
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
  &[data-tooltip = 'true'] {
    margin-top: -${({ theme }) => theme.space['1']};
  }
  /* Mozilla */
  &::-moz-range-track {
    ${trackStyle}
  }
  &::-moz-range-thumb {
    ${({ theme, themeSlider, disabled }) => thumbStyle(theme, themeSlider, disabled)}
    }

  /* Other browsers */
  &::-ms-track {
    ${trackStyle}
  }

  &:focus::-webkit-slider-runnable-track {
    ${trackStyle}
  }

  &::-webkit-slider-thumb {
    ${({ theme, themeSlider, disabled }) => thumbStyle(theme, themeSlider, disabled)}
  }
`
const DoubleSliderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: -webkit-fill-available;
  width: -moz-available;
  height: ${({ theme }) => theme.space['2']};
  align-self: center;
  `

const CustomRail = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: ${({ theme }) => theme.space['1']};
  width:100%;
  min-width: 220px;  
  border-radius: ${({ theme }) => theme.radii.default};
  background: ${({ theme }) => theme.colors.neutral.borderWeak};
`

const InnerRail = styled.div`
  position: absolute;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary.border};
  border-radius: ${({ theme }) => theme.radii.default};

  &[data-error='true']{
    background-color: ${({ theme }) => theme.colors.danger.backgroundStrong};
  }

  &[aria-disabled='true'] {
    background-color: ${({ theme }) => theme.colors.primary.borderDisabled};
  }
`

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
  possibleValues,
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
}: DoubleSliderProps) => {
  const { theme } = useTheme()
  const localId = useId()
  const finalId = id ?? localId
  const fixedValue = value[1] >= value[0] + step ? value : [value[1], value[0]]
  const refSlider = useRef<HTMLInputElement>(null)
  const [computedValue, setValues] = useState(fixedValue)
  const [valueToShow, setValuesToShow] = useState<(number | null)[]>(fixedValue)
  const [sliderWidth, setWidth] = useState(
    refSlider.current?.offsetWidth ?? SLIDER_WIDTH.max,
  )
  const [customValue, setCustomValue] = useState<undefined | number[]>(
    undefined,
  )

  const ticks = useMemo(() => {
    if (options === true) {
      return Array.from({ length: max - min + 1 }, (_, index) => ({
        value: min + index * step,
        label: String(min + index * step),
      })).filter(element => element.value <= max && element.value >= min)
    }
    if (options) return options
    if (possibleValues) {
      return possibleValues.map((element, index) => ({
        value: index,
        label: String(element),
      }))
    }

    return []
  }, [max, min, options, possibleValues, step])

  // Default value to be coherent with a custom scale when one is defined
  useEffect(() => {
    if (possibleValues) {
      setCustomValue([
        possibleValues[computedValue[0]],
        possibleValues[computedValue[1]],
      ])
    }
  }, [possibleValues, computedValue])

  // Update the values to be correct
  useEffect(() => {
    const newMinValue = !valueToShow[0] ? min : valueToShow[0]
    const newMaxValue = !valueToShow[1] ? max : valueToShow[1]
    const newValues = [newMinValue, newMaxValue]

    // Update maxValue and minValue so that maxValue > minValue
    if (newValues[1] < newValues[0]) {
      ;[newValues[0], newValues[1]] = [newValues[1], newValues[0]]
    }

    // Update all values and call onChange only if values were changed to avoid infinite loops
    if (
      newValues[0] !== computedValue[0] ||
      newValues[1] !== computedValue[1]
    ) {
      setValues(newValues)
      onChange?.(newValues)
    }
  }, [computedValue, max, min, onChange, step, valueToShow])

  // Get slider size (for options)
  useEffect(() => {
    const setWidthResize = () => {
      setWidth(refSlider.current?.offsetWidth ?? SLIDER_WIDTH.max)
    }
    window.addEventListener('resize', setWidthResize)

    return () => {
      window.removeEventListener('resize', setWidthResize)
    }
  }, [])

  const handleMinChange = (newMinVal: number) => {
    const newVal = Math.min(newMinVal, computedValue[1] - step)
    if (possibleValues) {
      // Custom scale
      const optionLabel = possibleValues[newVal]
      const newCustomValue = [
        optionLabel,
        customValue ? customValue[1] : computedValue[1],
      ]
      setCustomValue(newCustomValue)
      onChange?.(newCustomValue)
    }
    onChange?.([newVal, computedValue[1]])
    setValuesToShow([newVal, computedValue[1]])
  }

  const handleMaxChange = (newMaxVal: number) => {
    const newVal = Math.max(newMaxVal, computedValue[0] + step)
    if (possibleValues) {
      // Custom scale
      const optionLabel = possibleValues[newVal]
      const newCustomValue = [
        customValue ? customValue[0] : computedValue[0],
        optionLabel,
      ]
      setCustomValue(newCustomValue)
      onChange?.(newCustomValue)
    }
    onChange?.([computedValue[0], newVal])
    setValuesToShow([computedValue[0], newVal])
  }

  const handleChangeInput = (val: number, side?: 'left' | 'right') => {
    if (side === 'left') {
      setValuesToShow([
        Math.min((valueToShow[1] ?? max) - step, val),
        valueToShow[1],
      ])
    } else if (side === 'right') {
      setValuesToShow([
        valueToShow[0],
        Math.max(val, (valueToShow[0] ?? min) + step),
      ])
    }
  }

  const styledValue = (
    valueNumber: string | number | null,
    side?: 'left' | 'right',
  ) =>
    input && (!options || options === true) && !possibleValues ? (
      <StyledNumberInput
        value={
          typeof valueNumber === 'string'
            ? parseFloat(valueNumber)
            : valueNumber
        }
        size="small"
        min={side === 'left' ? min : computedValue[0] + step}
        max={side === 'left' ? computedValue[1] - step : max}
        step={step}
        aria-label={`input-${side}`}
        controls={false}
        data-testid={side ? `slider-input-${side}` : 'slider-input'}
        unit={typeof suffix === 'string' ? suffix : unit}
        onChange={newVal => {
          if (newVal) {
            handleChangeInput(newVal, side)
          } else if (side === 'left') {
            setValuesToShow([null, computedValue[1]])
          } else if (side === 'right') {
            setValuesToShow([computedValue[0], null])
          }
        }}
        onBlur={event => {
          if (!event.target.value) {
            // Default to min/max when the input is left empty
            setValuesToShow(
              side === 'left'
                ? [min, computedValue[1]]
                : [computedValue[0], max],
            )
          }
        }}
      />
    ) : (
      <StyledTextValue
        as="span"
        variant="bodySmall"
        sentiment="neutral"
        placement={direction !== 'row' ? 'right' : 'center'}
        double
        isColumn={direction === 'column'}
        data-testid={
          dataTestId ? `${dataTestId}-value-${side}` : `value-${side}`
        }
      >
        {prefix}
        {valueNumber}
        {suffix ? suffix[side === 'left' ? 0 : 1] : unit}
      </StyledTextValue>
    )

  // Position of the sliders to look like one range slider
  const minPos = ((computedValue[0] - min) * 100) / (max - min)
  const maxPos = ((computedValue[1] - min) * 100) / (max - min)

  const tooltipText = useMemo(() => {
    if (tooltip === true) return computedValue

    if (Array.isArray(tooltip)) return tooltip

    if (typeof tooltip === 'string') return tooltip

    return [null, null]
  }, [tooltip, computedValue])

  const placementTooltip = [
    ((computedValue[0] - min) / (max - min)) * (sliderWidth - THUMB_SIZE) +
      THUMB_SIZE / 2,
    ((computedValue[1] - min) / (max - min)) * (sliderWidth - THUMB_SIZE) +
      THUMB_SIZE / 2,
  ]

  return (
    <Stack gap={1} direction="column" justifyContent="left">
      {label ? (
        <Stack justifyContent="space-between" direction="row">
          <Label
            direction={direction}
            input={input}
            finalId={finalId}
            label={label}
            required={required}
          />
        </Stack>
      ) : null}
      <Stack direction={direction} gap={1} width="100%">
        {direction === 'column' ? (
          <Stack justifyContent="space-between" direction="row">
            {styledValue(customValue ? customValue[0] : valueToShow[0], 'left')}
            {styledValue(
              customValue ? customValue[1] : valueToShow[1],
              'right',
            )}
          </Stack>
        ) : null}
        {direction === 'row'
          ? styledValue(customValue ? customValue[0] : valueToShow[0], 'left')
          : null}

        <DoubleSliderWrapper>
          <StyledTooltip
            text={typeof tooltipText === 'string' ? tooltipText : undefined}
            placement={tooltipPosition}
            left={(placementTooltip[0] + placementTooltip[1]) / 2}
          >
            <CustomRail>
              <InnerRail
                style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
                data-error={!!error}
                aria-disabled={!!disabled}
              />
            </CustomRail>

            <StyledTooltip
              text={Array.isArray(tooltipText) ? tooltipText[0] : undefined}
              placement={tooltipPosition}
              left={placementTooltip[0]}
            >
              <SliderElement
                className={className}
                name={name}
                data-tooltip={!!tooltip}
                id={finalId}
                disabled={!!disabled}
                onBlur={onBlur}
                onFocus={onFocus}
                data-error={error}
                data-direction={direction}
                type="range"
                value={computedValue[0]}
                min={min}
                suffix={!!(suffix || unit)}
                aria-label={ariaLabel ?? name}
                max={max}
                step={step}
                data-testid={dataTestId ? `${dataTestId}-left` : 'handle-left'}
                onChange={event => {
                  event.preventDefault()
                  handleMinChange(parseFloat(event.target.value))
                }}
                themeSlider={theme}
                ref={refSlider}
              />
            </StyledTooltip>
            <StyledTooltip
              text={Array.isArray(tooltipText) ? tooltipText[1] : undefined}
              placement={tooltipPosition}
              left={placementTooltip[1]}
            >
              <SliderElement
                className={className}
                type="range"
                value={computedValue[1]}
                name={name}
                disabled={!!disabled}
                data-tooltip={!!tooltip}
                suffix={!!(suffix || unit)}
                id={finalId}
                onBlur={onBlur}
                onFocus={onFocus}
                data-error={error}
                data-direction={direction}
                aria-label={ariaLabel ?? name}
                data-testid={
                  dataTestId ? `${dataTestId}-right` : 'handle-right'
                }
                min={min}
                max={max}
                step={step}
                onChange={event => {
                  event.preventDefault()
                  handleMaxChange(parseFloat(event.target.value))
                }}
                themeSlider={theme}
              />
            </StyledTooltip>
          </StyledTooltip>
          {options || possibleValues ? (
            <Options
              ticks={ticks}
              min={min}
              max={max}
              sliderWidth={sliderWidth}
              unit={unit}
              value={computedValue}
              step={step}
            />
          ) : null}
        </DoubleSliderWrapper>

        {direction === 'row'
          ? styledValue(customValue ? customValue[1] : valueToShow[1], 'right')
          : null}
      </Stack>
    </Stack>
  )
}
