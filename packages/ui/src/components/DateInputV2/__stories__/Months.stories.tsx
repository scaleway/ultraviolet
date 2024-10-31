import { Template } from './Template'

export const Months = Template.bind({})

Months.args = {
  label: 'Months',
  showMonthYearPicker: true,
  disabled: false,
}

Months.decorators = [
  StoryComponent => (
    <div style={{ height: '350px' }}>
      <StoryComponent />
    </div>
  ),
]
