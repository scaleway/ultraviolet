import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { HTMLAttributes } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Text } from '../Text'
import {
  DataList,
  Option,
  StyledTooltip,
  thumbStyle,
  trackStyle,
} from './SliderDecoration'
import { SLIDER_WIDTH, THUMB_SIZE } from './constant'

type SliderProps = {
  name: string
  min?: number
  max?: number
  direction: 'column' | 'row'
  step?: number
  value: number[]
  options?: { value: number; label?: string }[]
  labelTooltip?: boolean | string[]
  disabled?: boolean
  error?: string | boolean
  onChange: (value: number | number[]) => void
  'data-testid'?: string
} & Pick<
  HTMLAttributes<HTMLInputElement>,
  'id' | 'onBlur' | 'onFocus' | 'aria-label' | 'className'
>

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
  'aria-label': ariaLabel,
}: SliderProps) => {
  const { theme } = useTheme()
  const refSlider = useRef<HTMLInputElement>(null)
  const [maxValue, setMaxValue] = useState(value[1])
  const [minValue, setMinValue] = useState(value[0])
  const [sliderWidth, setWidth] = useState(
    refSlider.current?.offsetWidth ?? SLIDER_WIDTH.max,
  )

  useEffect(() => {
    setMinValue(value[0])
    setMaxValue(value[1])
  }, [value])

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

  const handleMinChange = (newMinVal: number) => {
    const newVal = Math.min(newMinVal, maxValue - step)
    setMinValue(newVal)
    onChange([newVal, maxValue])
  }
  const handleMaxChange = (newMaxVal: number) => {
    const newVal = Math.max(newMaxVal, minValue + step)
    setMaxValue(newVal)
    onChange([minValue, newVal])
  }

  // Position of the sliders to look like one range slider
  const minPos = ((value[0] - min) * 100) / (max - min)
  const maxPos = ((value[1] - min) * 100) / (max - min)

  const tooltipText = useMemo(() => {
    if (typeof labelTooltip === 'boolean') {
      return value
    }
    if (Array.isArray(labelTooltip)) {
      return labelTooltip
    }

    return [null, null]
  }, [labelTooltip, value])

  const placementTooltip = [
    ((value[0] - min) / (max - min)) * (sliderWidth - THUMB_SIZE) +
      THUMB_SIZE / 2,
    ((value[1] - min) / (max - min)) * (sliderWidth - THUMB_SIZE) +
      THUMB_SIZE / 2,
  ]

  return (
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
          value={minValue}
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
          value={maxValue}
          name={name}
          disabled={!!disabled}
          data-tooltip={!!labelTooltip}
          id={`${id}-left`}
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
                    value.includes(element.value) ? 'captionStrong' : 'caption'
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
  )
}
