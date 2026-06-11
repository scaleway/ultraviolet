import { Button, DateInput, RadioGroup, Row, Stack, SwitchButton, TimeInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import type { FilterConfigItemDatetimeRange } from '../../types'
import type { DatetimeRangeInputValue, DatetimeRangeLocales } from './type'

type Props = {
  onApply: (newValue: DatetimeRangeInputValue) => void
  minDate?: Date
  maxDate?: Date
  value: DatetimeRangeInputValue
  dateInputLocale: ComponentProps<typeof DateInput>['locale']
  relativePresets: FilterConfigItemDatetimeRange['relativePresets']
  localeTexts: DatetimeRangeLocales
}

export const Dropdown = ({
  onApply,
  minDate,
  maxDate,
  value,
  dateInputLocale,
  relativePresets,
  localeTexts,
}: Props) => {
  const [localPreset, setLocalPreset] = useState<string | null>(value.preset)
  const [localDateRange, setLocalDateRange] = useState<[Date | null, Date | null]>([value.startAt, value.endAt])
  const [localTimeStart, setLocalTimeStart] = useState<Date | undefined>(() => {
    if (value.startAt) {
      return value.startAt
    }
    const newDate = new Date()
    newDate.setHours(0)
    newDate.setMinutes(0)
    newDate.setSeconds(0)
    return newDate
  })
  const [localTimeEnd, setLocalTimeEnd] = useState<Date | undefined>(() => {
    if (value.endAt) {
      return value.endAt
    }
    const newDate = new Date()
    newDate.setHours(23)
    newDate.setMinutes(59)
    newDate.setSeconds(59)
    return newDate
  })

  const handleApply = () => {
    if (localPreset) {
      onApply({
        endAt: value.endAt,
        preset: localPreset,
        startAt: value.startAt,
      })
    } else {
      const startAt = localDateRange[0] ? new Date(localDateRange[0]) : null
      if (startAt && localTimeStart) {
        startAt.setHours(localTimeStart.getHours())
        startAt.setMinutes(localTimeStart.getMinutes())
        startAt.setSeconds(localTimeStart.getSeconds())
      }
      const endAt = localDateRange[1] ? new Date(localDateRange[1]) : null
      if (endAt && localTimeEnd) {
        endAt.setHours(localTimeEnd.getHours())
        endAt.setMinutes(localTimeEnd.getMinutes())
        endAt.setSeconds(localTimeEnd.getSeconds())
      }
      onApply({
        endAt,
        preset: null,
        startAt,
      })
    }
  }

  return (
    <Stack gap={1} width="100%">
      <SwitchButton
        name="timeType"
        onChange={event => {
          if (event.target.value === 'relative') {
            setLocalPreset(relativePresets[0].value)
          } else {
            setLocalPreset(null)
          }
        }}
        value={localPreset ? 'relative' : 'absolute'}
      >
        <SwitchButton.Option value="relative">{localeTexts.relative}</SwitchButton.Option>
        <SwitchButton.Option value="absolute">{localeTexts.absolute}</SwitchButton.Option>
      </SwitchButton>
      <Stack>
        {localPreset ? (
          <Stack gap={1}>
            <RadioGroup
              onChange={event => {
                setLocalPreset(event.target.value)
              }}
              value={localPreset}
            >
              {relativePresets.map(presetObj => (
                <RadioGroup.Radio key={presetObj.value} label={presetObj.label} value={presetObj.value} />
              ))}
            </RadioGroup>
          </Stack>
        ) : (
          <Stack gap={1}>
            <DateInput
              endDate={localDateRange[1]}
              input="calendar"
              locale={dateInputLocale}
              maxDate={maxDate}
              minDate={minDate}
              onChange={newDateRange => {
                setLocalDateRange([newDateRange[0], newDateRange[1]])
              }}
              selectsRange
              startDate={localDateRange[0]}
            />
            <Row gap={2} templateColumns="1fr 1fr">
              <TimeInput label={localeTexts.timeStart} onChange={setLocalTimeStart} value={localTimeStart} />
              <TimeInput label={localeTexts.timeEnd} onChange={setLocalTimeEnd} value={localTimeEnd} />
            </Row>
          </Stack>
        )}
      </Stack>
      <Button onClick={handleApply} size="medium">
        {localeTexts.apply}
      </Button>
    </Stack>
  )
}
