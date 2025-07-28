import { Template } from './Template'

export const Months = Template.bind({})

Months.args = {
  disabled: false,
  label: 'Months',
  showMonthYearPicker: true,
}

Months.decorators = [
  StoryComponent => (
    <div style={{ height: '350px' }}>
      <StoryComponent />
    </div>
  ),
]
