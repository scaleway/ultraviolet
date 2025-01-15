import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { TimeInputFieldV2 } from '..'
import { Submit } from '../../Submit'
import { Template } from './Template.stories'

export const TimeFormat: StoryFn<
  ComponentProps<typeof TimeInputFieldV2>
> = args => (
  <Stack gap={1}>
    <TimeInputFieldV2 {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

TimeFormat.args = { ...Template.args, timeFormat: 12, label: '12-hour format' }
