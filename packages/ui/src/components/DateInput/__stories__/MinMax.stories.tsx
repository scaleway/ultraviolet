import { Template } from './Template'

export const MinMax = Template.bind({})

MinMax.parameters = {
  docs: {
    description: {
      story: 'With `minDate` and `maxDate` you can define limits of the input',
    },
  },
}

MinMax.args = {
  label: 'Date',
  maxDate: new Date('December 25, 1995 03:24:00'),
  minDate: new Date('December 12, 1995 03:24:00'),
  value: new Date('1995-12-17T03:24:00'),
}

MinMax.decorators = [
  StoryComponent => (
    <div style={{ height: '400px' }}>
      <StoryComponent />
    </div>
  ),
]
