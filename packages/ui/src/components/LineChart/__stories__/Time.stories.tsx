import { format } from 'date-fns'
import { lineChartHoursData } from './mockData'
import { Template } from './Template.stories'

export const Time = Template.bind({})

Time.args = {
  data: lineChartHoursData,
  axisFormatters: {
    bottom: value => format(new Date(value), 'dd-MM-y'),
  },
}
