import { Template } from './Template.stories'

export const DefaultValue = Template.bind({})

DefaultValue.args = {
  minValue: 0,
  maxValue: 100,
  defaultValue: 20,
}

DefaultValue.parameters = {
  docs: {
    storyDescription:
      'If you use this component as an uncontrolled component you can use the prop `defaultValue` to define the initial value. If defaultValue is not in minValue/maxValue range it will be set to closest valid value.',
  },
}
