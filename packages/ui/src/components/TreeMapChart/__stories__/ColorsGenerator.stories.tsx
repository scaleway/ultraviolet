import type { StoryFn } from '@storybook/react-vite'
import { TreeMapChart } from '..'
import { treeMapChartColorsData } from './mockData'

export const ColorsGenerator: StoryFn<typeof TreeMapChart> = props => (
  <TreeMapChart {...props} data={treeMapChartColorsData} height="300px" />
)

ColorsGenerator.parameters = {
  docs: {
    description: {
      story: 'You can show a lots of data and colors should vary accordingly',
    },
  },
}
