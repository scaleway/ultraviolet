import type { StoryFn } from '@storybook/react-vite'
import { TreeMapChart } from '..'
import { treeMapChartWithCustomContentData } from './mockData'

export const CustomContent: StoryFn<typeof TreeMapChart> = props => (
  <TreeMapChart
    {...props}
    data={treeMapChartWithCustomContentData}
    height="300px"
  />
)

CustomContent.parameters = {
  docs: {
    description: {
      story: 'You can show custom content with ReactNode instead of string',
    },
  },
}
