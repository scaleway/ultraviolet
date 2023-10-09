import { Template } from './Template'

export const Selected = Template.bind({})

Selected.parameters = {
  docs: {
    description: {
      story:
        'Selected is automatically determined as the last element. One can be specified using `selected` prop.',
    },
  },
}

Selected.args = {
  selected: 0,
}
