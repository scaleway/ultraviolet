import { ComponentStory } from '@storybook/react'
import { useState } from 'react'
import SelectNumber from '..'

export const Template: ComponentStory<typeof SelectNumber> = ({ ...props }) => {
  const [value, setValue] = useState(0)

  return (
    <SelectNumber
      minValue={0}
      onChange={val => typeof val === 'number' && setValue(val)}
      value={value}
      {...props}
    />
  )
}
