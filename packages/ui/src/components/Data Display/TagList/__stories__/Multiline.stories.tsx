import { Template } from './Template.stories'

export const Multiline = Template.bind({})

Multiline.parameters = {
  docs: {
    description: {
      story: '`multiline` can be used to allow a multiline tag container.',
    },
  },
}

Multiline.args = {
  multiline: true,
  tags: ['very', ...Array.from({ length: 50 }, () => 'item'), 'tooltip', 'scaleway', 'paris', 'cloud'],
  threshold: 55,
}

Multiline.decorators = [
  Story => (
    <div style={{ width: '500px' }}>
      <Story />
    </div>
  ),
]
