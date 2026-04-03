import { OptionSelectorField } from '..'

import { firstSelectorOptions, secondSelectorOptions } from './resources'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof OptionSelectorField> = args => (
  <OptionSelectorField
    {...args}
    firstSelector={{ options: firstSelectorOptions }}
    secondSelector={{ options: secondSelectorOptions }}
  />
)
