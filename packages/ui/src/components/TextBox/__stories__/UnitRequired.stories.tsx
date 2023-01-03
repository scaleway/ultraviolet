import { Template } from './Template.stories'

export const UnitRequired = Template.bind({})

UnitRequired.args = {
  label: 'Margin',
  defaultValue: '16',
  unit: 'px',
  required: true,
}
