import { format } from 'date-fns'
import { lineChartHoursData } from './mockData'
import { Template } from './Template.stories'

export const FormattedAxisAndPoints = Template.bind({})

FormattedAxisAndPoints.args = {
  data: lineChartHoursData,
  axisFormatters: {
    bottom: value => format(new Date(value), 'dd-MM'),
    left: value => `${value.toString()} liters`,
  },
  pointFormatters: {
    x: value => format(new Date(value), 'dd-MM-y hh:mm'),
    y: value => `${value.toString()} liters`,
  },
}
