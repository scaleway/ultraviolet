import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { SelectInput } from '..'
import { dataGrouped, dataGroupedWithEmptyName } from './resources'

export const Grouped: StoryFn<typeof SelectInput> = args => (
  <Stack gap={8}>
    <SelectInput label="Label" {...args} options={dataGrouped} />
    <SelectInput
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
