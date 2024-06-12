import { format } from 'date-fns'
import { Template } from './Template.stories'
import { lineChartHoursData } from './mockData'

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
