import { format } from 'date-fns'
import { lineChartMultipleData } from './mockData'
import { Template } from './Template.stories'

export const MultipleSeriesWithCustomLegend = Template.bind({})

MultipleSeriesWithCustomLegend.args = {
  data: lineChartMultipleData,
  axisFormatters: {
    bottom: value => format(new Date(value), 'dd-MM-y'),
  },
  withLegend: true,
}
