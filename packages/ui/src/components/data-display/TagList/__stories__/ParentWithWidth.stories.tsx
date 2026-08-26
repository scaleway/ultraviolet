import type { StoryFn } from '@storybook/react-vite'
import { TagList } from '..'
import { Stack } from '../../../layout/Stack'

export const ParentWithDefinedWidth: StoryFn<typeof TagList> = args => {
  return (
    <Stack gap={2}>
      <div
        style={{
          border: '1px solid gray',
          padding: '10px',
          overflow: 'hidden',
          resize: 'horizontal',
        }}
      >
        <TagList {...args} />
      </div>

      <div style={{ border: '1px solid gray', padding: '10px', width: '100px' }}>
        <TagList {...args} />
      </div>

      <div style={{ border: '1px solid gray', padding: '10px', width: '100px' }}>
        <TagList {...args} tags={['Looooooooooooong']} />
      </div>
    </Stack>
  )
}

ParentWithDefinedWidth.parameters = {
  docs: {
    description: {
      story: 'The `threshold` in the example is 5. Is is ignored because the tags will then overflow the parent.',
    },
  },
}

ParentWithDefinedWidth.args = {
  popoverTitle: 'Additional',
  tags: ['smooth', 'code', 'hello', 'world', 'please', 'work'],
  threshold: 5,
}
