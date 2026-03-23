import { TreeMapChart } from '..'

import { treeMapChartColorsData } from './mockData'

import type { StoryFn } from '@storybook/react-vite'

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
