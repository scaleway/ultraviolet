import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'
import {
  DataList,
  Option,
  StyledNumberInput,
  StyledText,
  StyledTooltip,
  thumbStyle,
  trackStyle,
} from './SliderDecoration'
import { SLIDER_WIDTH, THUMB_SIZE } from './constant'
import type { DoubleSliderProps } from './types'

const SliderElement = styled('input', {
  shouldForwardProp: prop => !['themeSlider'].includes(prop),
})<{ themeSlider: string; disabled: boolean }>`
  position: absolute;
  width: 100%;
  pointer-events: none;
  appearance: none;
  height: 100%;
  opacity: 1;
  padding: 0;
  background: transparent;

  &[data-tooltip = "true"] {
    margin-top: -${({ theme }) => theme.space[1]};
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
  height: ${({ theme }) => theme.space[2]};
  align-self: center;
  `

const CustomRail = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: ${({ theme }) => theme.space[1]};
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
const StyledDataList = styled(DataList)`
margin-top: ${({ theme }) => theme.space[3]};
`

export const DoubleSlider = ({
  name,
  labelTooltip,
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
  label,
  input,
  prefix,
  suffix,
  required,
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

  // Update the values to be correct
  useEffect(() => {
    const newMinValue =
      !valueToShow[0] || valueToShow[0] < min ? min : valueToShow[0]
    const newMaxValue =
      !valueToShow[1] || valueToShow[1] > max ? max : valueToShow[1]
    const newValues = [newMinValue, newMaxValue]

    // Update maxValue and minValue so that maxValue > minValue
    if (newValues[1] < newValues[0]) {
      ;[newValues[0], newValues[1]] = [newValues[1], newValues[0]]
    }

    // Update maxValue to always have minValue < maxValue
    if (newValues[1] <= newValues[0] + step) {
      newValues[1] = newValues[0] + step
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
    onChange?.([newVal, computedValue[1]])
    setValuesToShow([newVal, computedValue[1]])
  }

  const handleMaxChange = (newMaxVal: number) => {
    const newVal = Math.max(newMaxVal, computedValue[0] + step)
    onChange?.([computedValue[0], newVal])
    setValuesToShow([computedValue[0], newVal])
  }

  const handleChangeInput = (val: number, side?: 'left' | 'right') => {
    if (side === 'left') setValuesToShow([val, valueToShow[1]])
    else if (side === 'right') setValuesToShow([valueToShow[0], val])
  }

  const handleBlur = (val: number, side?: 'left' | 'right') => {
    if (side === 'left') {
      const newComputedValue = [...valueToShow]
      newComputedValue[0] = Math.max(
        min,
        Math.min((valueToShow[1] ?? max) - step, val),
      )
      setValuesToShow(newComputedValue)
    } else if (side === 'right') {
      const newComputedValue = [...valueToShow]
      newComputedValue[1] = Math.min(
        max,
        Math.max((valueToShow[0] ?? min) + step, val),
      )
      setValuesToShow(newComputedValue)
    }
  }

  const styledValue = (valueNumber: number | null, side?: 'left' | 'right') =>
    input ? (
      <StyledNumberInput
        value={valueNumber}
        size="small"
        min={min}
        max={max}
        step={step}
        controls={false}
        data-testid={side ? `slider-input-${side}` : 'slider-input'}
        unit={typeof suffix === 'string' ? suffix : undefined}
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
          const valueToCompute = parseFloat(event.target.value)
          handleBlur(valueToCompute, side)
        }}
      />
    ) : (
      <StyledText
        as="span"
        variant="bodySmall"
        sentiment="neutral"
        placement={direction !== 'row' ? 'right' : 'center'}
        double
        isColumn={direction === 'column'}
      >
        {prefix}
        {valueNumber}
        {suffix}
      </StyledText>
    )

  // Position of the sliders to look like one range slider
  const minPos = ((computedValue[0] - min) * 100) / (max - min)
  const maxPos = ((computedValue[1] - min) * 100) / (max - min)

  const tooltipText = useMemo(() => {
    if (typeof labelTooltip === 'boolean') {
      return computedValue
    }
    if (Array.isArray(labelTooltip)) {
      return labelTooltip
    }

    return [null, null]
  }, [labelTooltip, computedValue])

  const placementTooltip = [
    ((computedValue[0] - min) / (max - min)) * (sliderWidth - THUMB_SIZE) +
      THUMB_SIZE / 2,
    ((computedValue[1] - min) / (max - min)) * (sliderWidth - THUMB_SIZE) +
      THUMB_SIZE / 2,
  ]

  return (
    <Stack gap={1} direction={direction} justifyContent="left">
      {label ? (
        <Stack justifyContent="space-between" direction="row">
          <Stack gap={0.5} direction="row">
            <Text
              as="label"
              variant="bodyStrong"
              htmlFor={finalId}
              placement="left"
            >
              {label}
            </Text>
            {required ? (
              <Icon name="asterisk" sentiment="danger" size={8} />
            ) : null}
          </Stack>
        </Stack>
      ) : null}

      {direction === 'column' ? (
        <Stack justifyContent="space-between" direction="row">
          {styledValue(valueToShow[0], 'left')}
          {styledValue(valueToShow[1], 'right')}
        </Stack>
      ) : null}

      {direction === 'row' ? styledValue(valueToShow[0], 'left') : null}
      <DoubleSliderWrapper>
        <CustomRail>
          <InnerRail
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
            data-error={!!error}
            aria-disabled={!!disabled}
          />
        </CustomRail>
        <StyledTooltip
          text={tooltipText[0]}
          placement="top"
          left={placementTooltip[0]}
        >
          <SliderElement
            className="input"
            name={name}
            data-tooltip={!!labelTooltip}
            id={`${id}-left`}
            disabled={!!disabled}
            onBlur={onBlur}
            onFocus={onFocus}
            data-error={error}
            data-direction={direction}
            type="range"
            value={computedValue[0]}
            min={min}
            aria-label={ariaLabel}
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
          text={tooltipText[1]}
          placement="top"
          left={placementTooltip[1]}
        >
          <SliderElement
            className="input"
            type="range"
            value={computedValue[1]}
            name={name}
            disabled={!!disabled}
            data-tooltip={!!labelTooltip}
            id={`${id}-right`}
            onBlur={onBlur}
            onFocus={onFocus}
            data-error={error}
            data-direction={direction}
            aria-label={ariaLabel}
            data-testid={dataTestId ? `${dataTestId}-right` : 'handle-right'}
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
        {options ? (
          <StyledDataList>
            {options.map(element => {
              const offsetElement = element.value === min ? 0 : 4
              const left =
                ((element.value - min) / (max - min)) *
                  (sliderWidth - THUMB_SIZE) +
                offsetElement

              return (
                <Option key={element.value} left={left}>
                  <Text
                    as="p"
                    variant={
                      value.includes(element.value)
                        ? 'captionStrong'
                        : 'caption'
                    }
                    sentiment={
                      value.includes(element.value) ? 'primary' : 'neutral'
                    }
                  >
                    {element.label ?? element.value}
                  </Text>
                </Option>
              )
            })}
          </StyledDataList>
        ) : null}
      </DoubleSliderWrapper>

      {direction === 'row' ? styledValue(valueToShow[1], 'right') : null}
    </Stack>
  )
}
