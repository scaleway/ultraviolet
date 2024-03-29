import { Template } from './Template.stories'

export const TabIndex = Template.bind({})

TabIndex.args = {
  label: 'First Name',
  tabIndex: -1,
}

TabIndex.parameters = {
  docs: {
    description: {
      story: 'Can disable tabulation on field with `tabIndex="-1"`',
    },
  },
}
