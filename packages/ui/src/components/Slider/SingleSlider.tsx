import type { Theme } from '@emotion/react'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { HTMLAttributes } from 'react'
import { useMemo } from 'react'

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

const sliderThumbStyle = (theme: Theme, themeSlider: string) => `
 
    -webkit-appearance: none;
    appearance: none;
    width: ${theme.space[2]};
    height: ${theme.space[2]};
    background: ${themeSlider === 'light' ? theme.colors.neutral.background : theme.colors.neutral.backgroundStronger};
    box-shadow: ${theme.shadows.defaultShadow};
    border-radius: ${theme.radii.circle};
    border: none;
    cursor: pointer;
      transition: background 0.3s ease-in-out;

    &:hover, :active {
    border: 1.5px solid ${theme.colors.primary.border}
    }

    &:active {
    box-shadow: ${theme.shadows.focusPrimary}
    }
`
const sliderTrackStyle = () => `
    -webkit-appearance: none; 
    box-shadow: none; 
    border: none; 
    background: transparent; 
`
const SliderElement = styled('input', {
  shouldForwardProp: prop => !['themeSlider'].includes(prop),
})<{ themeSlider: string }>`
    appearance: none;
    -webkit-appearance: none;
    height: ${({ theme }) => theme.space[1]};
    width:100%;
    min-width: 220px;
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


/* Mozilla Firefox */
    ::-moz-range-track {
        ${sliderTrackStyle()}
    }
    ::-moz-range-thumb {
        ${({ theme, themeSlider }) => sliderThumbStyle(theme, themeSlider)}
    }

    /* Other browsers */
    ::-webkit-slider-runnable-track {
        ${sliderTrackStyle()}
       

    }
    ::-webkit-slider-thumb {
        ${({ theme, themeSlider }) => sliderThumbStyle(theme, themeSlider)}
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
  onFocus,
  className,
  'aria-label': ariaLabel,
}: SliderProps) => {
  const { theme } = useTheme()
  const getBackgroundSize = useMemo(
    () => ({
      backgroundSize: `${((Number(value) - min) * 100) / (max - min)}% 100%`,
    }),
    [value, min, max],
  )

  return (
    <SliderElement
      type="range"
      value={value}
      onChange={event => {
        onChange(event.target.value)
      }}
      min={min}
      max={max}
      step={step}
      name={name}
      disabled={disabled}
      data-testid={dataTestId}
      id={id}
      onBlur={onBlur}
      onFocus={onFocus}
      aria-label={ariaLabel}
      className={className}
      data-tooltip={labelTooltip}
      style={getBackgroundSize}
      data-error={error}
      data-direction={direction}
      themeSlider={theme}
    />
  )
}
