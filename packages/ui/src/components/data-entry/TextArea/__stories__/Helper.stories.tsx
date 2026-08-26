import { Template } from './Template.stories'

export const Helper = Template.bind({})

Helper.args = {
  ...Template.args,
  helper: 'Helper text',
}

Helper.parameters = {
  docs: {
    description: {
      story:
        'Add an helper below the `TextArea` using the `helper` string property. Any helper will be replaced by provided success message',
    },
  },
}
