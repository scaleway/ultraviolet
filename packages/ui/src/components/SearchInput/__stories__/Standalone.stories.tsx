import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { SearchInput } from '..'

export const Standalone: StoryFn<typeof SearchInput> = ({ ...args }) => {
  const [value, setValue] = useState('')

  return (
    <div style={{ height: '120px' }}>
      <SearchInput
        {...args}
        placeholder="Type something"
        onSearch={setValue}
        onClose={() => {}}
      />
      <div style={{ marginTop: '20px' }}>
        <p>Value: {value}</p>
      </div>
    </div>
  )
}

Standalone.parameters = {
  docs: {
    description: {
      story:
        "The component can take a children or not. If not set the popup won't be displayed and the component will act as a simple input.",
    },
  },
}
