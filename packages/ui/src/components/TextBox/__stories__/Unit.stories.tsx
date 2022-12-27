import { Template } from './Template.stories'

export const Unit = Template.bind({})

Unit.args = {
  label: 'Margin',
  defaultValue: '16',
  unit: 'px',
}

Unit.parameters = {
  docs: {
    storyDescription: 'Specify a unit using `unit` prop.',
  },
}
