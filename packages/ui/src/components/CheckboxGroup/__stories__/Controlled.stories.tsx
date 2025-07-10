import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { CheckboxGroup } from '..'

export const Controlled: StoryFn = () => {
  const [values, onChange] = useState(['termsAndConditions'])

  return (
    <CheckboxGroup
      legend="Conditions:"
      name="conditions"
      value={values}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const data = [...values]
        if (data.includes(e.currentTarget.value)) {
          data.splice(data.indexOf(e.currentTarget?.value), 1)
        } else {
          data.push(e.currentTarget.value)
        }
        onChange(data)
      }}
    >
      <CheckboxGroup.Checkbox
        name="termsAndConditions"
        value="termsAndConditions"
      >
        Accept terms and conditions
      </CheckboxGroup.Checkbox>
      <CheckboxGroup.Checkbox name="newsletter" value="newsletter">
        Accept to receive newsletter
      </CheckboxGroup.Checkbox>
      {JSON.stringify(values, null, 4)}
    </CheckboxGroup>
  )
}

Controlled.parameters = {
  docs: {
    description: {
      story:
        'CheckboxGroup only work as a controlled component. You need to pass `onChange` callback to control it.',
    },
  },
}
