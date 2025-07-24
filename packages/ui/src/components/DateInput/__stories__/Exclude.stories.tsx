import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { DateInput } from '..'
import { Stack } from '../../Stack'

export const Exclude: StoryFn<ComponentProps<typeof DateInput>> = args => (
  <Stack gap={3}>
    <DateInput {...args} />
    <DateInput
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

Exclude.decorators = [
  StoryComponent => (
    <div style={{ height: '400px' }}>
      <StoryComponent />
    </div>
  ),
]
