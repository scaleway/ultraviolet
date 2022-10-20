import { Template } from './Template.stories'

export const TextColor = Template.bind({})

TextColor.args = {
  text: 'Hello You',
  textColor: 'black',
}

TextColor.parameters = {
  docs: {
    storyDescription: 'You can set the text color by setting `textColor` prop',
  },
}
