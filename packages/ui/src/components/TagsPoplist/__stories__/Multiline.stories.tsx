import { Template } from './Template.stories'

export const Multiline = Template.bind({})

Multiline.parameters = {
  docs: {
    description: {
      story: '`multiline` can be used to allow a multilined tag container.',
    },
  },
}

Multiline.args = {
  multiline: true,
  tags: [
    'very',
    ...Array<string>(50).fill('item'),
    'tooltip',
    'scaleway',
    'paris',
    'cloud',
  ],
  threshold: 55,
}

Multiline.decorators = [
  Story => (
    <div style={{ width: '500px' }}>
      <Story />
    </div>
  ),
]
