import { useState } from 'react'

import { PhoneInput } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof PhoneInput> = ({ ...args }) => {
  const [value, setValue] = useState<string | undefined>(args.value)

  return (
    <PhoneInput
      {...args}
      onChange={event => setValue(event.target.value)}
      value={value}
    />
  )
}

Template.args = {
  defaultCountry: 'FR',
  label: 'Phone Number',
  name: 'phone',
  placeholder: 'Enter phone number',
  value: '+33612345678',
}
