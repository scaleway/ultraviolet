import type { StoryFn } from '@storybook/react-vite'
import { OptionSelectorField } from '..'
import { firstSelectorOptions, secondSelectorOptions } from './resources'

export const Template: StoryFn<typeof OptionSelectorField> = args => (
  <OptionSelectorField
    {...args}
    firstSelector={{ options: firstSelectorOptions }}
    secondSelector={{ options: secondSelectorOptions }}
  />
)
