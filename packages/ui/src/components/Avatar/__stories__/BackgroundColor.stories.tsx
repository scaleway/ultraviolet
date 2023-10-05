import { Template } from './Template.stories'

export const BackgroundColor = Template.bind({})

BackgroundColor.args = {
  text: 'Hello You',
  textBgColor: 'warning',
}

BackgroundColor.parameters = {
  docs: {
    description: {
      story:
        'You can set the background color when using text by setting `textBgColor` prop',
    },
  },
}
