import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { SelectInputField } from '..'
import { planets } from './resources'

export const Multiple: StoryFn<
  ComponentProps<typeof SelectInputField>
> = () => (
  <SelectInputField
    multiselect
    name="options"
    options={planets}
    selectAll={{
      label: 'Select all',
    }}
    selectAllGroup
  />
)
