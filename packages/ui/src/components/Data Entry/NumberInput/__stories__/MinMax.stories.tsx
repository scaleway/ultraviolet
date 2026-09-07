import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { NumberInput } from '..'

export const Template: StoryFn<typeof NumberInput> = props => {
  const [value, setValue] = useState<number | null>(10)
  console.debug(props.helper)

  return <NumberInput {...props} onChange={setValue} value={value} />
}

export const MinMax = Template.bind({})

const min = 10
const max = 100

MinMax.args = {
  helper: `You should enter a number between ${min} and ${max}`,
  id: 'number-input',
  label: 'Number Input',
  max,
  min,
  name: 'number-input',
}

MinMax.parameters = {
  docs: {
    description: {
      story:
        'The `min` and `max` props can be used to define the minimum and maximum values that can be entered in the input. When the input is controlled (if a `value` prop is passed) and the value is out of range the min. or max. value will be set.',
    },
  },
}
