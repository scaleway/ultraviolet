import { useState } from 'react'

import { TextInput } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const OnRandomize: StoryFn<typeof TextInput> = ({ ...args }) => {
  const [value, setValue] = useState(args.value)

  return (
    <TextInput
      {...args}
      onChange={event => setValue(event.target.value)}
      onRandomize={() => {
        setValue(`randomValue-${Math.round(Math.random() * 1000)}`)
      }}
      value={value}
    />
  )
}

OnRandomize.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  value: 'Text',
}
