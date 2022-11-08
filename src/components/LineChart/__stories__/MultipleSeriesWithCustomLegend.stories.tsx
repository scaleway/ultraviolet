import { format } from 'date-fns'
import { Template } from './Template.stories'
import { lineChartMultipleData } from './mockData'

export const MultipleSeriesWithCustomLegend = Template.bind({})

MultipleSeriesWithCustomLegend.args = {
  data: lineChartMultipleData,
  axisFormatters: {
    bottom: value => format(new Date(value), 'dd-MM-y'),
  },
  withLegend: true,
}
