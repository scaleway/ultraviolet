import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { SelectInputFieldV2 } from '..'
import { planets } from './resources'

export const Multiple: StoryFn<
  ComponentProps<typeof SelectInputFieldV2>
> = () => (
  <SelectInputFieldV2
    selectAllGroup
    selectAll={{
      label: 'Select all',
    }}
    name="options"
    multiselect
    options={planets}
  />
)
