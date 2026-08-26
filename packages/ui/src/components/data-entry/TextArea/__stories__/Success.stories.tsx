import { Template } from './Template.stories'

export const Success = Template.bind({})

Success.args = {
  ...Template.args,
  success: 'value is valid',
}

Success.parameters = {
  docs: {
    description: {
      story:
        'Mark `TextArea` in an success state using `success` string property. Any helper will be replaced by provided success message',
    },
  },
}
