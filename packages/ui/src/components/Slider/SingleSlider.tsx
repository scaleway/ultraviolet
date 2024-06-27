import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'
import {
  DataList,
  Option,
  StyledNumberInput,
  StyledTooltip,
  thumbStyle,
  trackStyle,
} from './SliderDecoration'
import { SLIDER_WIDTH, THUMB_SIZE } from './constant'
import type { SingleSliderProps } from './types'

const StyledTextValue = styled(Text, {
  shouldForwardProp: prop => !['double', 'isColumn'].includes(prop),
})<{ double: boolean; isColumn: boolean }>`
  min-width: ${({ theme, double, isColumn }) => (double && isColumn ? null : theme.space[5])};
  align-self: ${({ double }) => (double ? 'center' : 'end')};
`

const SliderElement = styled('input', {
  shouldForwardProp: prop => !['themeSlider'].includes(prop),
})<{ themeSlider: string; disabled: boolean }>`
    appearance: none;
    height: ${({ theme }) => theme.space[1]};
    width:100%;
    min-width: ${SLIDER_WIDTH.min}px;
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
        ${({ theme, themeSlider, disabled }) => thumbStyle(theme, themeSlider, disabled)}
    }

    /* Other browsers */
    ::-webkit-slider-runnable-track {
        ${trackStyle}
    }
    ::-webkit-slider-thumb {
        ${({ theme, themeSlider, disabled }) => thumbStyle(theme, themeSlider, disabled)}
    }
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
  optionsUnit,
  unit,
  options,
  possibleValues,
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
  const [computedValue, setValues] = useState(value)
  const [valueToShow, setValuesToShow] = useState<number | null>(value)
  const refSlider = useRef<HTMLInputElement>(null)
  const [sliderWidth, setWidth] = useState(
    refSlider.current?.offsetWidth ?? SLIDER_WIDTH.max,
  )
  const [customValue, setCustomValue] = useState<undefined | number>(undefined)

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

  // Make sure that min <= value <= max
  useEffect(() => {
    console.log('coucou1')

    if (value < min) {
      setValuesToShow(min)
      onChange?.(min)
    }
    if (value > max) {
      onChange?.(max)
      setValuesToShow(max)
    }
  }, [value, max, min, onChange, step])

  // Sync values with valuesToShow
  useEffect(() => {
    setValues(valueToShow ?? min)
    onChange?.(valueToShow ?? min)
  }, [max, min, onChange, valueToShow])

  // Get slider size
  useEffect(() => {
    const setWidthResize = () => {
      setWidth(refSlider.current?.offsetWidth ?? SLIDER_WIDTH.max)
    }
    window.addEventListener('resize', setWidthResize)

    return () => {
      window.removeEventListener('resize', setWidthResize)
    }
  }, [])

  const handleChange = useCallback(
    (newValue: number) => {
      console.log('coucou2')

      if (possibleValues) {
        // Custom scale
        const optionLabel = possibleValues[newValue ?? min]
        setCustomValue(optionLabel)
        setValuesToShow(newValue)
      } else {
        setValuesToShow(newValue)
      }
      console.log('coucou3')
    },
    [min, possibleValues],
  )

  const getBackgroundSize = useMemo(
    () => ({
      backgroundSize: `${((computedValue - min) * 100) / (max - min)}% 100%`,
    }),
    [computedValue, min, max],
  )

  const styledValue = (valueNumber: string | number | null) =>
    input && (!options || options === true) && !possibleValues ? (
      <StyledNumberInput
        value={
          typeof valueNumber === 'string'
            ? parseFloat(valueNumber)
            : valueNumber
        }
        size="small"
        min={min}
        aria-label="input"
        max={max}
        step={step}
        controls={false}
        data-testid="slider-input"
        unit={typeof suffix === 'string' ? suffix : unit}
        onChange={newVal => {
          console.log('coucou3')

          if (newVal) {
            setValuesToShow(newVal)
          } else setValuesToShow(null)

          console.log('coucou4')
        }}
        onBlur={event => {
          console.log('coucou5')

          if (!event.target.value) setValuesToShow(min)
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
      >
        {prefix}
        {valueNumber}
        {suffix ?? unit}
      </StyledTextValue>
    )

  const tooltipText = useMemo(() => {
    if (tooltip === true) {
      return computedValue
    }
    if (tooltip) {
      return tooltip
    }

    return null
  }, [tooltip, computedValue])

  const placementTooltip =
    ((computedValue - min) / (max - min)) * (sliderWidth - THUMB_SIZE) +
    THUMB_SIZE / 2 -
    sliderWidth / 2

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

          {direction === 'column'
            ? styledValue(customValue ?? valueToShow)
            : null}
        </Stack>
      ) : null}

      {direction === 'column' && !label
        ? styledValue(customValue ?? valueToShow)
        : null}
      <Stack direction="column" width="100%" gap={1} justifyContent="center">
        <StyledTooltip
          text={tooltipText}
          placement={tooltipPosition}
          left={placementTooltip}
        >
          <SliderElement
            type="range"
            value={computedValue}
            onChange={event => {
              handleChange(parseFloat(event.target.value))
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
          />
        </StyledTooltip>
        {options || possibleValues ? (
          <DataList>
            {ticks.map((element, index, { length }) => {
              const offsetElement = index === 0 ? 0 : 4
              const left =
                ((element.value - min) / (max - min)) *
                  (sliderWidth - THUMB_SIZE) +
                offsetElement
              const formatedElement =
                optionsUnit && (index === 0 || index === length - 1)
                  ? (element.label ?? String(element.value)).concat(optionsUnit)
                  : element.label ?? String(element.value)

              return (
                <Option
                  key={element.value}
                  left={left}
                  /*                   onClick={() => setValuesToShow(element.value)}
                   */
                >
                  <Text
                    as="p"
                    variant={
                      element.value === computedValue
                        ? 'captionStrong'
                        : 'caption'
                    }
                    sentiment={
                      element.value === computedValue ? 'primary' : 'neutral'
                    }
                  >
                    {formatedElement}
                  </Text>
                </Option>
              )
            })}
          </DataList>
        ) : null}
      </Stack>
      {direction === 'row' ? styledValue(customValue ?? valueToShow) : null}
    </Stack>
  )
}
