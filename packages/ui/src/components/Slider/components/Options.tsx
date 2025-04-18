'use client'

import styled from '@emotion/styled'
import { Text } from '../../Text'
import { THUMB_SIZE } from '../constant'

export const DataList = styled.datalist`
  width: 100%;
  display: flex;
  position: relative;
  height: ${({ theme }) => theme.typography.caption.lineHeight};

  &[data-double='true'] {
    margin-top: ${({ theme }) => theme.space['5']};
  }
`

export const Option = styled('span', {
  shouldForwardProp: prop => !['left', 'width'].includes(prop),
})<{ left: number; width: number }>`
  display: flex;
  white-space: nowrap;
  left: ${({ left }) => left}%;
  position: absolute;
  transform: translateX(-50%);

  &[data-element-left='true'] {
    transform: none;
  }

  &[data-element-right='true'] {
    transform: translateX(-100%);
  }
`

export type OptionsProps = {
  ticks: {
    value: number
    label?: string | undefined
  }[]
  min: number
  max: number
  sliderWidth: number
  value?: number | number[]
  step: number
}

export const Options = ({
  ticks,
  min,
  max,
  sliderWidth,
  value,
  step,
}: OptionsProps) => {
  const optionWidth = ((sliderWidth - THUMB_SIZE / 2) * step) / (max - min)

  return (
    <DataList data-double={Array.isArray(value)}>
      {ticks.map((element, index, { length }) => {
        const left = ((index * step - min) * 100) / (max - min)

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
          <Option
            key={element.value}
            left={left}
            width={optionWidth}
            data-value={element.value}
            data-element-left={index === 0}
            data-element-right={index === length - 1}
          >
            <Text
              as="p"
              variant={isSelected ? 'captionStrong' : 'caption'}
              sentiment={isSelected ? 'primary' : 'neutral'}
            >
              {formatedElement}
            </Text>
          </Option>
        )
      })}
    </DataList>
  )
}
