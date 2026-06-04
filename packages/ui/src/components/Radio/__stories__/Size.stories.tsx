import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Radio } from '..'

export const Size: StoryFn = args => {
  const [value, onChange] = useState('medium')

  return (
    <>
      <Radio
        {...args}
        checked={value === 'medium'}
        label="Medium"
        name="group"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
        value="medium"
      />
      <Radio
        {...args}
        checked={value === 'small'}
        label="Small"
        name="group"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
        value="small"
        size="small"
      />
    </>
  )
}

Size.parameters = {
  docs: {
    description: { story: 'Radio can be medium (default value) or small' },
  },
}
