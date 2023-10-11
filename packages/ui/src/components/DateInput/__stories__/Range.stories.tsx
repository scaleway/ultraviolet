import { Template } from './Template'

export const Range = Template.bind({})

Range.parameters = {
  docs: {
    storyDescription:
      'With `startDate` and `endDate` you can define a range of dates',
  },
}

Range.args = {
  label: 'Date',
  startDate: new Date('December 12, 1995 03:24:00'),
  endDate: new Date('December 25, 1995 03:24:00'),
  selectRange: true,
}
