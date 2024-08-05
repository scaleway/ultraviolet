import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { NumberInputV2 } from '../../NumberInputV2'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { SLIDER_WIDTH, THUMB_SIZE } from '../constant'
import { StyledTooltip, thumbStyle, trackStyle } from '../styles'
import type { DoubleSliderProps } from '../types'
import { Label } from './Label'
import { Options } from './Options'

const StyledTextValue = styled(Text, {
  shouldForwardProp: prop => !['double', 'isColumn'].includes(prop),
})<{ double: boolean; isColumn: boolean }>`
  min-width: ${({ theme, double, isColumn }) => (double && isColumn ? null : theme.space['5'])};
  align-self: ${({ double }) => (double ? 'center' : 'end')};
`

const SliderElement = styled('input', {
  shouldForwardProp: prop => !['themeSlider', 'suffix', 'left'].includes(prop),
})<{ themeSlider: string; disabled: boolean; suffix: boolean; left: number }>`
  position: absolute;
  width: 100%;
  pointer-events: none;
  appearance: none;
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

  /* Mozilla */
  &::-moz-range-track {
    ${trackStyle}
  }
  &::-moz-range-thumb {
    ${({ theme, themeSlider, disabled, left }) => thumbStyle(theme, themeSlider, disabled, left, true)}
    }

  /* Other browsers */
  &::-ms-track {
    ${trackStyle}
  }

  &:focus::-webkit-slider-runnable-track {
    ${trackStyle}
  }

  &::-webkit-slider-thumb {
    ${({ theme, themeSlider, disabled, left }) => thumbStyle(theme, themeSlider, disabled, left, true)}
  }
`
const DoubleSliderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: -webkit-fill-available;
  width: -moz-available;
  height: 8px;
  align-self: center;
  `

const CustomRail = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 8px;
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
  const refSlider = useRef<HTMLInputElement>(null)

  const safeValue =
    value && Array.isArray(value) && value.length === 2
      ? value
      : [min ?? 0, max ?? 1]
  const [selectedIndexes, setSelectedIndexes] = useState(safeValue)
  const [sliderWidth, setWidth] = useState(
    refSlider.current?.offsetWidth ?? SLIDER_WIDTH.max,
  )

  const activeValue = (side: 'left' | 'right') => {
    // Find the index of the min value (if side="left") and max value (side="right")
    if (side === 'left') {
      if (selectedIndexes[0] === null) return 0
      if (
        selectedIndexes[1] !== null &&
        selectedIndexes[1] < selectedIndexes[0]
      )
        {return 1}

      return 0
    }

    if (selectedIndexes[1] === null) return 1
    if (selectedIndexes[0] !== null && selectedIndexes[1] < selectedIndexes[0])
      {return 0}

    return 1
  }

  const ticks = useMemo(() => {
    if (options) {
      return options.map((element, index) => ({
        value: index,
        label: element.label,
      }))
    }

    return []
  }, [options])

  const internalOnChangeRef = useRef((localValue: (number | null)[]) => {
    const leftSliderValue = localValue[0] === null ? min : localValue[0]
    const rightSliderValue = localValue[1] === null ? max : localValue[1]
    const newValues = [leftSliderValue, rightSliderValue]

    setSelectedIndexes(newValues)
    onChange?.([Math.min(...newValues), Math.max(...newValues)])
  })

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

  const handleMinChange = (newValue: number) => {
    internalOnChangeRef.current([newValue, selectedIndexes[1]])
  }

  const handleMaxChange = (newValue: number) => {
    internalOnChangeRef.current([selectedIndexes[0], newValue])
  }

  const handleChangeInput = (val: number, side?: 'left' | 'right') => {
    if (side === 'left') {
      const newValue = Math.max(val, min)
      if (selectedIndexes[1]) {
        internalOnChangeRef.current([
          Math.min(newValue, selectedIndexes[1]),
          Math.max(newValue, selectedIndexes[1]),
        ])
      } else internalOnChangeRef.current([newValue, selectedIndexes[1]])
    } else if (side === 'right') {
      const newValue = Math.min(val, max)
      if (selectedIndexes[0]) {
        internalOnChangeRef.current([
          Math.min(newValue, selectedIndexes[0]),
          Math.max(newValue, selectedIndexes[0]),
        ])
      } else internalOnChangeRef.current([selectedIndexes[0], newValue])
    }
  }

  const styledValue = (
    valueNumber: string | number | null,
    side?: 'left' | 'right',
  ) =>
    input && !options ? (
      <NumberInputV2
        value={
          typeof valueNumber === 'string'
            ? parseFloat(valueNumber)
            : valueNumber
        }
        size="small"
        min={min}
        max={max}
        step={step}
        aria-label={`input-${side}`}
        controls={false}
        data-testid={side ? `slider-input-${side}` : 'slider-input'}
        unit={typeof suffix === 'string' ? suffix : unit}
        onChange={newVal => {
          if (newVal !== null) {
            handleChangeInput(newVal, side)
          } else if (side === 'left') {
            internalOnChangeRef.current([null, selectedIndexes[1]])
          } else if (side === 'right') {
            internalOnChangeRef.current([selectedIndexes[0], null])
          }
        }}
        onBlur={event => {
          // Default to min/max when the input is left empty
          if (!event.target.value) {
            if (side === 'left') {
              const index = activeValue('left')
              if (index === 0)
                {internalOnChangeRef.current([min, selectedIndexes[1]])}
              else internalOnChangeRef.current([selectedIndexes[0], max])
            }

            if (side === 'right') {
              const index = activeValue('right')
              if (index === 0)
                {internalOnChangeRef.current([min, selectedIndexes[1]])}
              else internalOnChangeRef.current([selectedIndexes[0], max])
            }
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
  const minPos = ((Math.min(...selectedIndexes) - min) * 100) / (max - min)
  const maxPos = ((Math.max(...selectedIndexes) - min) * 100) / (max - min)

  const tooltipText = useMemo(() => {
    if (tooltip === true) {
      return [Math.min(...selectedIndexes), Math.max(...selectedIndexes)]
    }
    if (Array.isArray(tooltip)) return tooltip

    if (typeof tooltip === 'string') return tooltip

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
            {styledValue(leftToShow, 'left')}
            {styledValue(rightToShow, 'right')}
          </Stack>
        ) : null}
        {direction === 'row' ? styledValue(leftToShow, 'left') : null}
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
                id={finalId}
                disabled={!!disabled}
                onBlur={onBlur}
                onFocus={onFocus}
                data-error={error}
                data-direction={direction}
                type="range"
                value={selectedIndexes[0]}
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
                left={((selectedIndexes[0] - min) * 100) / (max - min)}
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
                value={selectedIndexes[1]}
                name={name}
                disabled={!!disabled}
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
                left={((selectedIndexes[1] - min) * 100) / (max - min)}
              />
            </StyledTooltip>
          </StyledTooltip>
          {options ? (
            <Options
              ticks={ticks}
              min={min}
              max={max}
              sliderWidth={sliderWidth}
              value={selectedIndexes}
              step={step}
            />
          ) : null}
        </DoubleSliderWrapper>
        {direction === 'row' ? styledValue(rightToShow, 'right') : null}
      </Stack>
    </Stack>
  )
}
