import type { StoryFn } from '@storybook/react-vite'
import { BarChart } from '..'
import { barChartSimpleData } from './mockData'

export const Label: StoryFn<typeof BarChart> = ({ ...props }) => (
  <BarChart data={barChartSimpleData} {...props} />
)

Label.args = {
  chartProps: {
    enableLabel: true,
    label: d => `${d.value} €`,
    labelOffset: 10,
    labelPosition: 'end',
    legends: [
      {
        anchor: 'bottom-left',
        dataFrom: 'keys',
        direction: 'row',
        itemHeight: 16,
        itemsSpacing: 3,
        itemWidth: 100,
        translateY: 50,
      },
    ],
  },
}
