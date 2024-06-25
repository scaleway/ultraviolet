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
    -webkit-appearance: none;
    height: ${({ theme }) => theme.space[1]};
    width:100%;
    min-width: ${SLIDER_WIDTH.min}px;
    background-color: ${({ theme }) => theme.colors.neutral.borderWeak};
    outline: none;
    border-radius: ${({ theme }) => theme.radii.default};
    background-image:linear-gradient(${({ theme }) => theme.colors.primary.border}, ${({ theme }) => theme.colors.primary.border});
    background-repeat: no-repeat;
    align-self: center;

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
  options,
  onFocus,
  className,
  label,
  input,
  prefix,
  suffix,
  required,
  'aria-label': ariaLabel,
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
  const getBackgroundSize = useMemo(
    () => ({
      backgroundSize: `${((computedValue - min) * 100) / (max - min)}% 100%`,
    }),
    [computedValue, min, max],
  )
  useEffect(() => {
    // Make sure that min <= value <= max
    if (typeof computedValue === 'number') {
      if (computedValue < min) {
        setValues(min)
      }
      if (computedValue > max) {
        setValues(max)
      }
    }
  }, [computedValue, max, min, onChange, step])

  useEffect(() => {
    setValues(valueToShow ?? min)
    onChange?.(valueToShow ?? min)
  }, [max, min, onChange, valueToShow])

  const handleChange = useCallback(
    (newValue: typeof computedValue) => {
      onChange?.(newValue)
      setValuesToShow(newValue)
    },
    [onChange],
  )
  const handleChangeInput = (val: number) => {
    if (val) {
      setValuesToShow(val)
    }
  }

  const handleBlur = (val: number) => {
    if (val) {
      if (val > max) {
        setValuesToShow(max)
      } else {
        setValuesToShow(Math.max(val, min))
      }
    }
  }

  const styledValue = (valueNumber: number | null) =>
    input ? (
      <StyledNumberInput
        value={valueNumber}
        size="small"
        min={min}
        max={max}
        step={step}
        controls={false}
        data-testid="slider-input"
        unit={typeof suffix === 'string' ? suffix : undefined}
        onChange={newVal => {
          if (newVal) {
            handleChangeInput(newVal)
          } else setValuesToShow(null)
        }}
        onBlur={event => {
          const valueToCompute = parseFloat(event.target.value)
          handleBlur(valueToCompute)
        }}
      />
    ) : (
      <StyledTextValue
        as="span"
        variant="bodySmall"
        sentiment="neutral"
        placement="center"
        double={false}
        isColumn={direction === 'column'}
      >
        {prefix}
        {valueNumber}
        {suffix}
      </StyledTextValue>
    )

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
  const tooltipText = useMemo(() => {
    if (typeof labelTooltip === 'boolean') {
      return computedValue
    }
    if (labelTooltip) {
      return labelTooltip
    }

    return null
  }, [labelTooltip, computedValue])

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

          {direction === 'column' ? styledValue(valueToShow) : null}
        </Stack>
      ) : null}

      {direction === 'column' && !label ? styledValue(valueToShow) : null}
      <Stack direction="column" width="100%" gap={1} justifyContent="center">
        <StyledTooltip
          text={tooltipText}
          placement="top"
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
            step={step}
            name={name}
            disabled={!!disabled}
            aria-disabled={disabled}
            data-testid={dataTestId}
            id={id}
            onBlur={onBlur}
            onFocus={onFocus}
            role="slider"
            aria-label={ariaLabel}
            className={className}
            data-tooltip={labelTooltip}
            style={getBackgroundSize}
            data-error={!!error}
            data-direction={direction}
            themeSlider={theme}
            ref={refSlider}
          />
        </StyledTooltip>
        {options ? (
          <DataList>
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
                      element.value === computedValue
                        ? 'captionStrong'
                        : 'caption'
                    }
                    sentiment={
                      element.value === computedValue ? 'primary' : 'neutral'
                    }
                  >
                    {element.label ?? element.value}
                  </Text>
                </Option>
              )
            })}
          </DataList>
        ) : null}
      </Stack>
      {direction === 'row' ? styledValue(valueToShow) : null}
    </Stack>
  )
}
