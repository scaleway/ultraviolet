import { Template } from './Template.stories'

export const Progress = Template.bind({})

Progress.args = {
  progress: true,
}

Progress.parameters = {
  docs: {
    description: {
      story: 'Progress is used to show a loading state of the component.',
    },
  },
}
