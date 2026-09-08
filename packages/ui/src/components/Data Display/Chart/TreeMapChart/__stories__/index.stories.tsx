import type { Meta } from '@storybook/react-vite'
import { TreeMapChart } from '..'

export default {
  component: TreeMapChart,
  title: 'UI/Data Display/Chart/TreeMapChart',
  parameters: {
    a11y: false,
    a11yStatus: {
      perceivable: undefined,
      operable: undefined,
      understandable: undefined,
      robust: undefined,
    },
    experimental: true,
  },
  tags: ['experimental'],
} as Meta<typeof TreeMapChart>

export { Playground } from './Playground.stories'
export { CustomTooltip } from './CustomTooltip.stories'
export { ColorsGenerator } from './ColorsGenerator.stories'
export { CustomContent } from './CustomContent.stories'
