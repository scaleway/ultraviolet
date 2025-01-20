import { Template } from './Template.stories'

export const Fields = Template.bind({})
Fields.args = {
  label: 'Verification code',
  fields: 6,
}

Fields.parameters = {
  docs: {
    description: {
      story:
        'Use `fields` prop to set the amount of field case you want to have',
    },
  },
}
