import { Template } from './Template'

export const Exclude = Template.bind({})

Exclude.parameters = {
  docs: {
    description: {
      story: 'With `excludeDates` you can define a array of dates to exclude',
    },
  },
}

Exclude.args = {
  label: 'Date',
  value: new Date('December 13, 1995 03:24:00'),
  excludeDates: [
    new Date('December 1, 1995 03:24:00'),
    new Date('December 14, 1995 03:24:00'),
    new Date('December 22, 1995 03:24:00'),
    new Date('December 28, 1995 03:24:00'),
  ],
}
