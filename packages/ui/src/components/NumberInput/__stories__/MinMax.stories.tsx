import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { NumberInput } from '..'

export const Template: StoryFn<typeof NumberInput> = props => {
  const [value, setValue] = useState<number | null>(10)

  return <NumberInput {...props} value={value} onChange={setValue} />
}

export const MinMax = Template.bind({})

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
