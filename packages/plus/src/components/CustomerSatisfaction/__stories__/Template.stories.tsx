import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { CustomerSatisfaction } from '..'

export const Template: StoryFn<
  ComponentProps<typeof CustomerSatisfaction>
> = props => {
  const [value, setValue] = useState<1 | 2 | 3 | 4 | 5>(1)

  return (
    <div>
      <CustomerSatisfaction
        {...props}
        onChange={rating => setValue(rating)}
        value={value}
      />
    </div>
  )
}

Template.args = {
  onChange: rating => {
    console.log(rating)
  },
  value: 1,
}
