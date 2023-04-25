import { Template } from './Template.stories'

export const IconOnly = Template.bind({})

IconOnly.args = {
  ...Template.args,
  icon: 'pencil',
  children: undefined,
}

IconOnly.parameters = {
  docs: {
    storyDescription: '`children` element is not required',
  },
}
