import { useState } from 'react'

import { TagList } from '..'
import { Slider } from '../../Slider'
import { Stack } from '../../Stack'

import type { StoryFn } from '@storybook/react-vite'

export const ParentWithDefinedWidth: StoryFn<typeof TagList> = args => {
  const [width, setWidth] = useState(298)

  return (
    <Stack gap={2}>
      <Slider
        label="Change container width"
        max={500}
        min={2}
        onChange={setWidth}
        value={width}
      />
      <div
        style={{
          border: '1px solid gray',
          padding: '10px',
          width: `${width}px`,
        }}
      >
        <TagList {...args} />
      </div>

      <div
        style={{ border: '1px solid gray', padding: '10px', width: '100px' }}
      >
        <TagList {...args} />
      </div>

      <div
        style={{ border: '1px solid gray', padding: '10px', width: '100px' }}
      >
        <TagList {...args} tags={['Looooooooooooong']} />
      </div>
    </Stack>
  )
}

ParentWithDefinedWidth.parameters = {
  docs: {
    description: {
      story:
        'The `threshold` in the example is 5. Is is ignored because the tags will then overflow the parent.',
    },
  },
}

ParentWithDefinedWidth.args = {
  popoverTitle: 'Additional',
  tags: ['smooth', 'code', 'hello', 'world', 'please', 'work'],
  threshold: 5,
}
