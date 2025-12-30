import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { firstSelectorOptions, franceOptions } from '../__mock__/resources'
import { OptionSelector } from '../OptionSelector'

export const OneOption: StoryFn<
  ComponentProps<typeof OptionSelector>
> = props => (
  <OptionSelector
    {...props}
    firstSelector={{
      label: 'Region',
      options: [firstSelectorOptions[0]],
    }}
    secondSelector={{
      helper: 'Only one zone is available',
      label: 'Zone',
      options: [franceOptions[0]],
    }}
  />
)
