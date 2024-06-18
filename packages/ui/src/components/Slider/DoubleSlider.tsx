import type { Theme } from '@emotion/react'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { HTMLAttributes } from 'react'
import { useState } from 'react'

type SliderProps = {
  /**
   * Slider name
   */
  name: string
  min?: number
  max?: number
  direction: 'column' | 'row'

  /**
   * Step of the slider
   */
  step?: number
  /**
   * When a maximum value and a minimum value are needed
   */
  value: string | string[]
  labelTooltip?: boolean /**
   * Whether the slider is disabled
   */
  disabled?: boolean
  /**
   * Whether an error occured
   */
  error: string | boolean
  onChange: (value: string | string[]) => void
  'data-testid'?: string
} & Pick<
  HTMLAttributes<HTMLInputElement>,
  'id' | 'onBlur' | 'onFocus' | 'aria-label' | 'className'
>

const trackStyle = `
  appearance: none;
  background: transparent;
  border: transparent;
`

const thumbStyles = (theme: Theme, themeSlider: string) => `
  appearance: none;
  -webkit-appearance: none;
  pointer-events: all;
  width: ${theme.space[2]};
  height: ${theme.space[2]};
  background: ${themeSlider === 'light' ? theme.colors.neutral.background : theme.colors.neutral.backgroundStronger};
  box-shadow: ${theme.shadows.defaultShadow};
  border-radius: ${theme.radii.circle};
  border: none;
  cursor: grab;

  &:active {
    cursor: grabbing;
    box-shadow: ${theme.shadows.focusPrimary}

  }

  &:hover, :active {
    border: 1.5px solid ${theme.colors.primary.border}
  }

`

const Controls = styled('div', {
  shouldForwardProp: prop => !['themeSlider'].includes(prop),
})<{ themeSlider: string }>`
  ${({ theme, themeSlider }) => thumbStyles(theme, themeSlider)}
  width: ${({ theme }) => theme.space[2]};
  height: ${({ theme }) => theme.space[2]};
  border-radius: 50%;
  position: absolute;
  top: 50%;
  margin-left: calc(${({ theme }) => theme.space[2]} / -2);
  transform: translate3d(0, -50%, 0);
  z-index: 2;

  &:hover, :active {
    border: 1.5px solid ${({ theme }) => theme.colors.primary.border};
    }

  &:active {
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
  }
  `
const SliderElement = styled('input', {
  shouldForwardProp: prop => !['themeSlider'].includes(prop),
})<{ themeSlider: string }>`
  position: absolute;
  width: 100%;
  pointer-events: none;
  appearance: none;
  height: 100%;
  opacity: 0;
  z-index: 3;
  padding: 0;

  &::-ms-track {
    ${trackStyle}
  }

  &::-moz-range-track {
    ${trackStyle}
  }

  &:focus::-webkit-slider-runnable-track {
    ${trackStyle}
  }

  &::-ms-thumb {
    ${({ theme, themeSlider }) => thumbStyles(theme, themeSlider)}
  }

  &::-moz-range-thumb {
    ${({ theme, themeSlider }) => thumbStyles(theme, themeSlider)}
    }

  &::-webkit-slider-thumb {
    ${({ theme, themeSlider }) => thumbStyles(theme, themeSlider)}
  }
`
const DoubleSliderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: -webkit-fill-available;
  height: ${({ theme }) => theme.space[2]};
  `
const ControlsWrapper = styled.div`
width: 100%;
position: absolute;
height: ${({ theme }) => theme.space[2]};
`
const Rail = styled.div`
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
  'aria-label': ariaLabel,
}: SliderProps) => {
  const { theme } = useTheme()
  const [maxValue, setMaxValue] = useState(parseFloat(value[1]))
  const [minValue, setMinValue] = useState(parseFloat(value[0]))

  const handleMinChange = (newMinVal: string) => {
    const newVal = Math.min(parseFloat(newMinVal), maxValue - step)
    setMinValue(newVal)
    onChange([String(newVal), String(maxValue)])
  }
  const handleMaxChange = (newMaxVal: string) => {
    const newVal = Math.max(parseFloat(newMaxVal), minValue + step)
    setMaxValue(newVal)
    onChange([String(minValue), String(newVal)])
  }

  // Position of the sliders to look like one range slider
  const minPos = ((minValue - min) * 100) / (max - min)
  const maxPos = ((maxValue - min) * 100) / (max - min)

  return (
    <DoubleSliderWrapper>
      <SliderElement
        className="input"
        name={name}
        data-tooltip={labelTooltip}
        id={id}
        disabled={disabled}
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
          handleMinChange(event.target.value)
        }}
        themeSlider={theme}
      />

      <SliderElement
        className="input"
        type="range"
        value={maxValue}
        name={name}
        disabled={disabled}
        data-tooltip={labelTooltip}
        id={id}
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
          handleMaxChange(event.target.value)
        }}
        themeSlider={theme}
      />

      <ControlsWrapper>
        <Controls style={{ left: `${minPos}%` }} themeSlider={theme} />
        <Rail>
          <InnerRail
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
            data-error={!!error}
          />
        </Rail>
        <Controls style={{ left: `${maxPos}%` }} themeSlider={theme} />
      </ControlsWrapper>
    </DoubleSliderWrapper>
  )
}
