import { Template } from './Template.stories'

export const DisableResize = Template.bind({})

DisableResize.args = {
  label: 'First Name',
  multiline: true,
  resizable: false,
}

DisableResize.parameters = {
  docs: {
    description: {
      story: 'Disable resize in multiline mode using `resizable` prop.',
    },
  },
}
