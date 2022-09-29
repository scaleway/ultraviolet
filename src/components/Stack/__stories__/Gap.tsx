import Stack from '..'
import { Template } from './Template'

export const Gap = Template.bind({})

Gap.parameters = {
  docs: {
    storyDescription:
      'prop `Gap` define the spacing between each child based on theme.space. Default value : 0/none',
  },
}

Gap.decorators = [
  () => (
    <Stack direction="row" gap={4}>
      <div style={{ background: '#DDD', padding: '8px' }}>First child</div>
      <div style={{ background: '#DDD', padding: '8px' }}>Second child</div>
      <div style={{ background: '#DDD', padding: '8px' }}>Third child</div>
    </Stack>
  ),
]
