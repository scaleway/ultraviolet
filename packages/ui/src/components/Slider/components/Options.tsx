'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import { Text } from '../../Text'
import { leftOption, sliderStyle } from '../styles.css'

export type OptionsProps = {
  ticks: {
    value: number
    label?: string | undefined
  }[]
  min: number
  max: number
  value?: number | number[]
  step: number
  defaultScale: boolean
}

export const Options = ({
  ticks,
  min,
  max,
  value,
  step,
  defaultScale,
}: OptionsProps) => (
  <datalist
    className={sliderStyle.datalist({ double: Array.isArray(value) })}
    data-double={Array.isArray(value)}
  >
    {ticks.map((element, index, { length }) => {
      const left = defaultScale
        ? ((element.value - min) * 100) / (max - min)
        : ((index * step - min) * 100) / (max - min)

      const formatedElement = element.label ?? String(element.value)
      const getIsSelected = () => {
        if (!value) {
          return false
        }

        return typeof value === 'number'
          ? element.value === value
          : value.includes(element.value)
      }

      const isSelected = getIsSelected()

      return (
        <span
          className={sliderStyle.option({
            left: index === 0,
            right: defaultScale ? element.value === max : index === length - 1,
          })}
          data-element-left={index === 0}
          data-element-right={index === length - 1}
          data-value={element.value}
          key={element.value}
          style={assignInlineVars({
            [leftOption]: `${left}%`,
          })}
        >
          <Text
            as="p"
            sentiment={isSelected ? 'primary' : 'neutral'}
            variant={isSelected ? 'captionStrong' : 'caption'}
          >
            {formatedElement}
          </Text>
        </span>
      )
    })}
  </datalist>
)
