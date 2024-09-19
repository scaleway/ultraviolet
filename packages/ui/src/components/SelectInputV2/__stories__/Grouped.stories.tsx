import type { StoryFn } from '@storybook/react'
import { SelectInputV2 } from '..'
import { Stack } from '../../Stack'
import { dataGrouped, dataGroupedWithEmptyName } from './resources'

export const Grouped: StoryFn<typeof SelectInputV2> = args => (
  <Stack gap={8}>
    <SelectInputV2 label="Label" {...args} options={dataGrouped} />
    <SelectInputV2
      {...args}
      options={dataGroupedWithEmptyName}
      label="Grouped with empty group name"
    />
  </Stack>
)

Grouped.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]

Grouped.parameters = {
  docs: {
    description: {
      story:
        'It will detect when the data is grouped and display the options accordingly',
    },
  },
}
