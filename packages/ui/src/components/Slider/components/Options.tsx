import { Text } from '../../Text'
import { THUMB_SIZE } from '../constant'
import { DataList, Option } from '../styles'
import type { OptionsProps } from '../types'

export const Options = ({
  ticks,
  min,
  max,
  sliderWidth,
  unit,
  value,
  step,
}: OptionsProps) => {
  const optionWidth = ((sliderWidth - THUMB_SIZE / 2) * step) / (max - min)

  return (
    <DataList data-double={Array.isArray(value)}>
      {ticks.map((element, index, { length }) => {
        const offsetElement = index === length - 1 ? 0 : 4

        const left =
          index === 0
            ? ((element.value - min) / (max - min)) * (sliderWidth - THUMB_SIZE)
            : index * optionWidth - optionWidth / 2 + offsetElement

        const formatedElement =
          unit && (index === 0 || index === length - 1)
            ? (element.label ?? String(element.value)).concat(unit)
            : element.label ?? String(element.value)

        const isSelected =
          typeof value === 'number'
            ? element.value === value
            : value.includes(element.value)

        return (
          <Option
            key={element.value}
            left={left}
            width={optionWidth}
            data-value={element.value}
            data-first-element={index === 0}
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
