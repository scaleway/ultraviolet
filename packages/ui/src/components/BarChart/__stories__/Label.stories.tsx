import type { StoryFn } from '@storybook/react'
import { BarChart } from '..'
import { barChartSimpleData } from './mockData'

export const Label: StoryFn<typeof BarChart> = ({ ...props }) => (
  <BarChart data={barChartSimpleData} {...props} />
)

Label.args = {
  chartProps: {
    label: d => `${d.value} €`,
    labelOffset: 10,
    labelPosition: 'end',
    enableLabel: true,
    legends: [
      {
        dataFrom: 'keys',
        anchor: 'bottom-left',
        direction: 'row',
        translateY: 50,
        itemsSpacing: 3,
        itemWidth: 100,
        itemHeight: 16,
      },
    ],
  },
}
