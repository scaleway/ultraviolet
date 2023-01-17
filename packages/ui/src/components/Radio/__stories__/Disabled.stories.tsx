import type { Story } from '@storybook/react'
import { useState } from 'react'
import { Radio } from '..'

export const Disabled: Story = () => {
  const [value, onChange] = useState('disabled-label-2')

  return (
    <>
      <Radio
        name="disabled-label-1"
        disabled
        checked={value === 'disabled-label-1'}
        value="disabled-label-1"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.currentTarget.value)
        }
      >
        Label 1
      </Radio>
      <Radio
        name="disabled-label-2"
        checked={value === 'disabled-label-2'}
        value="disabled-label-2"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.currentTarget.value)
        }
      >
        Label 2
      </Radio>
    </>
  )
}

Disabled.parameters = {
  docs: {
    storyDescription: 'Set activation using `disabled` property.',
  },
}
