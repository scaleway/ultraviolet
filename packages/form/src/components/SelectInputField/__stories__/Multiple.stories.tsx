import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { SelectInputField } from '..'
import { planets } from './resources'

export const Multiple: StoryFn<
  ComponentProps<typeof SelectInputField>
> = () => (
  <SelectInputField
    selectAllGroup
    selectAll={{
      label: 'Select all',
    }}
    name="options"
    multiselect
    options={planets}
  />
)
