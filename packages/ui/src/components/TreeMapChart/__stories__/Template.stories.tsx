import { TreeMapChart } from '..'

import { treeMapChartSimpleData } from './mockData'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof TreeMapChart> = ({ ...props }) => (
  <TreeMapChart
    // @ts-expect-error - Data before props so it can be overwritten in Storybook
    data={treeMapChartSimpleData}
    height="300px"
    {...props}
  />
)
