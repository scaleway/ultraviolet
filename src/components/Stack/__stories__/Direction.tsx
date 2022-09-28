import Stack from '..'
import { Template } from './Template'

export const Direction = Template.bind({})

Direction.parameters = {
  docs: {
    storyDescription:
      'prop `Direction` allows the stack to behave as a column [DEFAULT] or a row',
  },
}

Direction.decorators = [
  () => (
    <Stack gap={2} direction="row">
      <div style={{ background: '#DDD', padding: '8px' }}>First child</div>
      <div style={{ background: '#DDD', padding: '8px' }}>Second child</div>
      <div style={{ background: '#DDD', padding: '8px' }}>Third child</div>
    </Stack>
  ),
]
