import { Button, Label, Popover, Stack } from '@ultraviolet/ui'
import { useMemo, useState } from 'react'
import type { FilterConfigItemDatetimeRange, FilterComponentProps } from '../../types'
import { Dropdown } from './Dropdown'
import type { DatetimeRangeInputValue } from './type'
import { filterDatetimeRangeStyles } from './filterDatetimeRange.styles.css'

type FilterDatetimeRangeProps = FilterComponentProps<DatetimeRangeInputValue, FilterConfigItemDatetimeRange>

export const FilterDatetimeRange = ({ onChange, value, hideLabel, config, size }: FilterDatetimeRangeProps) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  const formattedValue = useMemo(() => {
    if (value.preset) {
      return config.relativePresets.find(item => item.value === value.preset)?.label ?? value.preset
    }

    return `${value.startAt ? config.dateFormatter(value.startAt) : '-'} -> ${value.endAt ? config.dateFormatter(value.endAt) : 'Today'}`
  }, [value, config])

  return (
    <Popover
      className={filterDatetimeRangeStyles.popover}
      content={
        <Dropdown
          dateInputLocale={config.dateInputLocale}
          localeTexts={config.texts}
          maxDate={config.maxDate}
          minDate={config.minDate}
          onApply={newValue => {
            onChange(newValue)
            setIsPopupVisible(false)
          }}
          relativePresets={config.relativePresets}
          value={value}
        />
      }
      onClose={() => {
        setIsPopupVisible(false)
      }}
      placement="bottom"
      title={config.texts.dropdownTitle}
      visible={isPopupVisible}
    >
      <Stack gap={0.5} width="100%">
        {hideLabel ? null : <Label size={size}>{config.label}</Label>}
        <Button
          className={filterDatetimeRangeStyles.button}
          size={size}
          fullWidth
          onClick={() => {
            setIsPopupVisible(true)
          }}
          sentiment="neutral"
          variant="outlined"
        >
          {formattedValue}
        </Button>
      </Stack>
    </Popover>
  )
}
