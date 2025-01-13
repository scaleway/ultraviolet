import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from '..'

export const Template: StoryFn<typeof Checkbox> = ({
  'aria-label': ariaLabel,
  ...args
}) => {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox
      checked={checked}
      onChange={e => setChecked(e.target.checked)}
      {...args}
    >
      Beautiful checkbox
    </Checkbox>
  )
}

Template.args = {
  disabled: false,
  name: 'basic',
  value: 'label-1',
}
