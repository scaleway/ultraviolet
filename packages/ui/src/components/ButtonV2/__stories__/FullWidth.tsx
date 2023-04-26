import { Template } from './Template'

export const FullWidth = Template.bind({})

FullWidth.args = {
  ...Template.args,
  fullWidth: true,
}

FullWidth.parameters = {
  docs: {
    storyDescription: '`fullWidth` prop makes you button have a `100%` width.',
  },
}
