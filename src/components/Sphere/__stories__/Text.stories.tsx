import { Template } from './Template.stories'

export const Text = Template.bind({})

Text.args = {
  colors: ['#000'],
  size: 20,
  text: '★',
  textColor: '#fff',
}

Text.parameters = {
  docs: {
    storyDescription:
      "Set a text as content using 'text' props. You can also set the text color using 'textColor' prop",
  },
}
