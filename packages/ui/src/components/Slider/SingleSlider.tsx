import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { HTMLAttributes } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Stack } from '../Stack'
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
  options?: { value: number; label?: string }[]
  direction: 'column' | 'row'
  step?: number
  value: number
  labelTooltip?: boolean | string
  disabled?: boolean
  error: string | boolean
  onChange: (value: number | number[]) => void
  'data-testid'?: string
} & Pick<
  HTMLAttributes<HTMLInputElement>,
  'id' | 'onBlur' | 'onFocus' | 'aria-label' | 'className'
>

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
  'aria-label': ariaLabel,
}: SliderProps) => {
  const { theme } = useTheme()
  const refSlider = useRef<HTMLInputElement>(null)
  const [sliderWidth, setWidth] = useState(
    refSlider.current?.offsetWidth ?? SLIDER_WIDTH.max,
  )
  const getBackgroundSize = useMemo(
    () => ({
      backgroundSize: `${((Number(value) - min) * 100) / (max - min)}% 100%`,
    }),
    [value, min, max],
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
      return value
    }
    if (labelTooltip) {
      return labelTooltip
    }

    return null
  }, [labelTooltip, value])

  const placementTooltip =
    ((value - min) / (max - min)) * (sliderWidth - THUMB_SIZE) +
    THUMB_SIZE / 2 -
    sliderWidth / 2

  return (
    <Stack direction="column" width="100%" gap={1} justifyContent="center">
      <StyledTooltip text={tooltipText} placement="top" left={placementTooltip}>
        <SliderElement
          type="range"
          value={value}
          onChange={event => {
            onChange(parseFloat(event.target.value))
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
          aria-label={ariaLabel}
          className={className}
          data-tooltip={labelTooltip}
          style={getBackgroundSize}
          data-error={error}
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
                    element.value === value ? 'captionStrong' : 'caption'
                  }
                  sentiment={element.value === value ? 'primary' : 'neutral'}
                >
                  {element.label ?? element.value}
                </Text>
              </Option>
            )
          })}
        </DataList>
      ) : null}
    </Stack>
  )
}
