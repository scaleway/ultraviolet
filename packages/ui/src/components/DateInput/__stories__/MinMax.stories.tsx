import { Template } from './Template'

export const MinMax = Template.bind({})

MinMax.parameters = {
  docs: {
    storyDescription:
      'With `minDate` and `maxDate` you can define limits of the input',
  },
}

MinMax.args = {
  label: 'Date',
  value: new Date('1995-12-17T03:24:00'),
  minDate: new Date('December 12, 1995 03:24:00'),
  maxDate: new Date('December 25, 1995 03:24:00'),
}
