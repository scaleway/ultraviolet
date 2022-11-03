import { Template } from './Template.stories'

export const Icons = Template.bind({})

Icons.parameters = {
  docs: {
    description: {
      story:
        'Add Icon on left side of your tag, You can define it using `icon` property.',
    },
  },
}

Icons.args = {
  icon: 'check',
}
