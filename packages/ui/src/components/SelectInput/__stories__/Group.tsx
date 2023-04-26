import { Template } from './Template'

export const Group = Template.bind({})

Group.args = {
  ...Template.args,
  name: 'group',
  options: [
    {
      label: 'option1',
      options: [
        {
          label: '1-A',
          value: '1-A',
        },
        {
          label: '1-B',
          value: '1-B',
        },
        {
          label: '1-B',
          value: '1-B',
        },
      ],
    },
    {
      label: 'option2',
      options: [
        {
          label: '2-A',
          value: '2-A',
        },
        {
          label: '2-B',
          value: '2-B',
        },
        {
          label: '2-B',
          value: '2-B',
        },
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
      'By using the `options` prop you can regroup options by category/group (not possible when using JSX).',
  },
}
