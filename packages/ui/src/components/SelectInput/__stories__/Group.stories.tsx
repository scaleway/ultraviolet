import { Template } from './Template.stories'

export const Group = Template.bind({})

Group.args = {
  ...Template.args,
  name: 'group',
  options: [
    {
      label: 'Group 1',
      options: [
        { label: 'Option A', value: 'a' },
        { label: 'Option B', value: 'b' },
      ],
    },
    {
      label: 'Group 2',
      options: [
        { label: 'Option C', value: 'c' },
        { label: 'Option D', value: 'd' },
      ],
    },
  ],
}

Group.decorators = [
  StoryComponent => (
    <div style={{ height: '120px' }}>
      <StoryComponent />
    </div>
  ),
]

Group.parameters = {
  docs: {
    storyDescription:
      'By using `options` prop you can regroup options by category/group (no jsx way to do that).',
  },
}
