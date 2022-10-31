import { Template } from './Template.stories'

export const OnClose = Template.bind({})

OnClose.parameters = {
  docs: {
    description: {
      story:
        '`onClose` property to pass function trigger on click on close button.',
    },
  },
}

OnClose.args = {
  onClose: () => {},
}
