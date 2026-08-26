import { Template } from './Template.stories'

export const FullWidth = Template.bind({})

FullWidth.args = {
  ...Template.args,
  fullWidth: true,
}

FullWidth.parameters = {
  docs: {
    description: {
      story: '`fullWidth` prop makes you button have a `100%` width.',
    },
  },
}
