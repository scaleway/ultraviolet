import { TreeMapChart } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: TreeMapChart,
  title: 'Components/Data Display/Chart/TreeMapChart',
  parameters: {
    experimental: true,
  },
  tags: ['experimental'],
} as Meta<typeof TreeMapChart>

export { Playground } from './Playground.stories'
export { CustomTooltip } from './CustomTooltip.stories'
export { ColorsGenerator } from './ColorsGenerator.stories'
export { CustomContent } from './CustomContent.stories'
