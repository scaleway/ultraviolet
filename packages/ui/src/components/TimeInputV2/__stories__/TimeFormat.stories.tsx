import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { TimeInputV2 } from '..'
import { Stack } from '../../Stack'

type ValueType = {
  h: string
  m: string
  s: string
  period?: string
}

export const TimeFormat: StoryFn<typeof TimeInputV2> = () => {
  const [value1, setValue1] = useState<ValueType>({ h: '13', m: '34', s: '00' })
  const [value2, setValue2] = useState<ValueType>({ h: '13', m: '34', s: '00' })

  return (
    <Stack gap="2">
      <TimeInputV2
        label="12-hour format"
        timeFormat={12}
        value={value1}
        onChange={setValue1}
      />
      <TimeInputV2
        label="24-hour format"
        timeFormat={24}
        value={value2}
        onChange={setValue2}
      />
    </Stack>
  )
}
