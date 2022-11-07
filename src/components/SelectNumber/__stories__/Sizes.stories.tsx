import { ComponentStory } from '@storybook/react'
import { useState } from 'react'
import SelectNumber from '..'

export const Sizes: ComponentStory<typeof SelectNumber> = () => {
  const [value, setValue] = useState(0)

  return (
    <>
      <SelectNumber
        onChange={val => typeof val === 'number' && setValue(val)}
        value={value}
        size="small"
      />
      <SelectNumber
        onChange={val => typeof val === 'number' && setValue(val)}
        value={value}
        size="medium"
      />
      <SelectNumber
        onChange={val => typeof val === 'number' && setValue(val)}
        value={value}
        size="large"
      />
    </>
  )
}

Sizes.decorators = [
  StoryComponent => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <StoryComponent />
    </div>
  ),
]
