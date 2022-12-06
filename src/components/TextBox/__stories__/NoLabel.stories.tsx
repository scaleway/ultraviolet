import { Template } from './Template.stories'

export const NoLabel = Template.bind({})

NoLabel.args = {
  label: 'First Name',
  defaultValue: 'James Bond',
  noTopLabel: true,
}

NoLabel.parameters = {
  docs: {
    storyDescription:
      'You can hide the label and but it in `aria-label` attribute of the input by passing `noTopLabel` to the component',
  },
}
