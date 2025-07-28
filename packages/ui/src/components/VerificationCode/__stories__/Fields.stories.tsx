import { Template } from './Template.stories'

export const Fields = Template.bind({})
Fields.args = {
  fields: 6,
  label: 'Verification code',
}

Fields.parameters = {
  docs: {
    description: {
      story:
        'Use `fields` prop to set the amount of field case you want to have',
    },
  },
}
