import type { StoryFn } from '@storybook/react-vite'
import { TreeMapChart } from '..'
import { treeMapChartSimpleData } from './mockData'

export const Template: StoryFn<typeof TreeMapChart> = ({ ...props }) => (
  <TreeMapChart
    // @ts-expect-error - Data before props so it can be overwritten in Storybook
    data={treeMapChartSimpleData}
    height="300px"
    {...props}
  />
)
