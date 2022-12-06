import { Template } from './Template.stories'

export const Randomize = Template.bind({})

Randomize.args = {
  label: 'Label',
  random: 'prefix',
}

Randomize.parameters = {
  docs: {
    storyDescription: 'Set `random` prop adds a randomize button.',
  },
}
