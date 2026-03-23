import { format } from 'date-fns'

import { lineChartHoursData } from './mockData'
import { Template } from './Template.stories'

export const CustomTooltip = Template.bind({})

CustomTooltip.args = {
  tooltipFunction: ({ point }) => ({
    xFormatted: `Date: ${format(new Date(point.data.x), 'MM-y')}`,
    yFormatted: `Valeur: ${point.data.yFormatted}`,
  }),
  axisFormatters: {
    bottom: value => format(new Date(value), 'dd-MM-y'),
  },
  data: lineChartHoursData,
}
