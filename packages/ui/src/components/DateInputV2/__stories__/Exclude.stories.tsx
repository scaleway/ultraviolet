import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { DateInputV2 } from '..'
import { Stack } from '../../Stack'

export const Exclude: StoryFn<ComponentProps<typeof DateInputV2>> = args => (
  <Stack gap={3}>
    <DateInputV2 {...args} />
    <DateInputV2
      {...args}
      showMonthYearPicker
      label="With months"
      excludeDates={[
        new Date('November 1, 1995 03:24:00'),
        new Date('January 14, 1995 03:24:00'),
        new Date('March 22, 1995 03:24:00'),
      ]}
    />
  </Stack>
)
Exclude.parameters = {
  docs: {
    description: {
      story: 'With `excludeDates` you can define a array of dates to exclude',
    },
  },
}

Exclude.args = {
  label: 'Date',
  value: new Date('December 13, 1995 03:24:00'),
  excludeDates: [
    new Date('December 1, 1995 03:24:00'),
    new Date('December 14, 1995 03:24:00'),
    new Date('December 22, 1995 03:24:00'),
    new Date('December 28, 1995 03:24:00'),
  ],
}
