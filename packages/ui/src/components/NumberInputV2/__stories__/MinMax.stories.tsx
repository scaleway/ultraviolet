import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import type { NumberInputV2 } from '../index'
import { Template } from './Template.stories'

export const MinMax: StoryFn<typeof NumberInputV2> = args => {
  const [value, setValue] = useState('10')

  return (
    <Template
      {...args}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  )
}

MinMax.args = {
  id: 'number-input',
  label: 'Number Input',
  name: 'number-input',
  helper: 'You should enter a number between 0 and 100',
  min: 0,
  max: 100,
}

MinMax.parameters = {
  docs: {
    description: {
      story: `The \`min\` and \`max\` props can be used to define the minimum and maximum values that can be entered in the input. When the input is controlled (if a \`value\` prop is passed) and the value is out of range the min. or max. value will be set.`,
    },
  },
}
