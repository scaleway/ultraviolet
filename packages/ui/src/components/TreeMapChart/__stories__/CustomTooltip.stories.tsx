import type { StoryFn } from '@storybook/react-vite'
import { TreeMapChart } from '..'
import { treeMapChartSimpleData } from './mockData'

export const CustomTooltip: StoryFn<typeof TreeMapChart> = props => (
  <TreeMapChart
    {...props}
    data={treeMapChartSimpleData}
    height="300px"
    tooltipFunction={({ value, content }) => ({
      content: <>Custom: {content}</>,
      value: (value || 0) * 2,
    })}
  />
)

CustomTooltip.parameters = {
  docs: {
    description: {
      story: 'Use `tooltipFunction` to customize the tooltip.',
    },
  },
}
