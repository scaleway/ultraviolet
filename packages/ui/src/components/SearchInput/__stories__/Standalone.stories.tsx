import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { SearchInput } from '..'

export const Standalone: StoryFn<typeof SearchInput> = ({ ...args }) => {
  const [value, setValue] = useState('')
  const [submit, setSubmit] = useState<string | undefined>()

  return (
    <div style={{ height: '120px' }}>
      <Stack direction="row" gap={1}>
        <SearchInput
          {...args}
          placeholder="Type something"
          onSearch={setValue}
          onClose={() => {}}
        />
        <Button onClick={() => setSubmit(value)}>Search</Button>
      </Stack>
      <div style={{ marginTop: '20px' }}>
        <p>Value: {value}</p>
      </div>
      {submit ? (
        <div style={{ marginTop: '20px' }}>
          <p>Submitted with value: {submit}</p>
        </div>
      ) : null}
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
