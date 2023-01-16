import { Stack } from '../../Stack'
import { Template } from './Template.stories'

export const Tooltip = Template.bind({})

Tooltip.args = {
  label: 'Toggle me on',
  name: 'label',
  tooltip: 'Hello there!',
}

Tooltip.decorators = [
  StoryComponent => (
    <Stack gap={1} style={{ width: '200px' }}>
      <StoryComponent />
    </Stack>
  ),
]
