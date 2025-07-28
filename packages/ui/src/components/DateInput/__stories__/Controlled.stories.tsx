import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { DateInput } from '..'

export const Controlled: StoryFn<ComponentProps<typeof DateInput>> = args => {
  const [value, setValue] = useState<
    Date | Date[] | [Date | null, Date | null] | null
  >(new Date('December 17, 1995 03:24:00'))

  return (
    <Stack gap={2}>
      <DateInput
        {...args}
        label="Date"
        onChange={setValue}
        value={value as Date}
      />
      Selected date : {value?.toString()}
      <Button onClick={() => setValue(new Date('December 26, 1995 03:24:00'))}>
        Set date to 1995-12-26
      </Button>
    </Stack>
  )
}

Controlled.parameters = {
  docs: {
    description: {
      story:
        'Most of the time, you need a [controlled component](https://reactjs.org/docs/forms.html#controlled-components). By passing `value` and `onChange` prop you can control it.',
    },
  },
}

Controlled.decorators = [
  StoryComponent => (
    <div style={{ height: '400px' }}>
      <StoryComponent />
    </div>
  ),
]
