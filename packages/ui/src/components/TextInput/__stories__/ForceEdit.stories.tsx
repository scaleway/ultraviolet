import { Template } from './Template.stories'

export const ForceEdit = Template.bind({})

ForceEdit.args = {
  label: 'First Name',
  edit: true,
}

ForceEdit.parameters = {
  docs: {
    storyDescription:
      'It is possible to force edit mode (label at the top) using `edit` property. The principal use-case is to be compatible with browser autocomplete.',
  },
}
