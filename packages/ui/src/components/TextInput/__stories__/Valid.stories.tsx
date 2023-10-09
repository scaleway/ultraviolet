import { Template } from './Template.stories'

export const Valid = Template.bind({})

Valid.args = {
  label: 'First Name',
  valid: false,
}

Valid.parameters = {
  docs: {
    description: { story: 'Add a check mark using `valid` property.' },
  },
}
