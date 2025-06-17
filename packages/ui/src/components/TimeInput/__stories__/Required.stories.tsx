import { Template } from './Template.stories'

export const Required = Template.bind({})

Required.args = {
  required: true,
  label: 'Label',
}

Required.parameters = {
  docs: {
    description: { story: 'Add a required mark using `required` property.' },
  },
}
