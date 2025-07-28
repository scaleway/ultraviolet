import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { TimeInput } from '..'

export const Controlled: StoryFn<typeof TimeInput> = args => {
  const [value24, setValue24] = useState<Date>()
  const [value12, setValue12] = useState<Date>()

  return (
    <Stack gap={5}>
      <Stack gap={1}>
        <TimeInput
          {...args}
          labelDescription="24 format"
          onChange={newValue => {
            setValue24(newValue)
          }}
          value={value24}
        />
        Time: {value24?.toString()}
        <Button onClick={() => setValue24(new Date('01/01/2000 12:34:56'))}>
          set time to 12:34:56
        </Button>
      </Stack>
      <Stack gap={1}>
        <TimeInput
          {...args}
          labelDescription="12 format"
          onChange={newValue => {
            setValue12(newValue)
          }}
          timeFormat={12}
          value={value12}
        />
        Time: {value12?.toString()}
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
