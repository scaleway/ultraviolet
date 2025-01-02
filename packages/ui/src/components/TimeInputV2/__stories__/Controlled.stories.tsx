import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { type Time, TimeInputV2 } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'

export const Controlled: StoryFn<typeof TimeInputV2> = args => {
  const [value24, setValue24] = useState<Time>()
  const [value12, setValue12] = useState<Time>()

  return (
    <Stack gap={5}>
      <Stack gap={1}>
        <TimeInputV2
          {...args}
          onChange={newValue => {
            setValue24(newValue)
          }}
          value={value24}
          labelDescription="24 format"
        />
        Time: {value24?.h}h {value24?.m}m {value24?.s}s
        <Button onClick={() => setValue24({ h: '12', m: '34', s: '56' })}>
          set time to 12:34:56
        </Button>
      </Stack>
      <Stack gap={1}>
        <TimeInputV2
          {...args}
          onChange={newValue => {
            setValue12(newValue)
          }}
          value={value12}
          timeFormat={12}
          labelDescription="12 format"
        />
        Time: {value12?.h}h {value12?.m}m {value12?.s}s {value12?.period}
      </Stack>
    </Stack>
  )
}

Controlled.args = {
  label: 'Label',
}

Controlled.parameters = {
  docs: {
    description: {
      story:
        'Most of the time, you need a [controlled component](https://reactjs.org/docs/forms.html).',
    },
  },
}
