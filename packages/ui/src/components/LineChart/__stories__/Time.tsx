import { format } from 'date-fns'
import { Template } from './Template'
import { lineChartHoursData } from './mockData'

export const Time = Template.bind({})

Time.args = {
  data: lineChartHoursData,
  axisFormatters: {
    bottom: value => format(new Date(value), 'dd-MM-y'),
  },
}
