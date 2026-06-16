import type { Meta } from '@storybook/react-vite'
import { TreeMapChart } from '..'

export default {
  component: TreeMapChart,
  title: 'UI/Data Display/Chart/TreeMapChart',
  parameters: {
    a11y: false,
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
    experimental: true,
  },
  tags: ['experimental'],
} as Meta<typeof TreeMapChart>

export { Playground } from './Playground.stories'
export { CustomTooltip } from './CustomTooltip.stories'
export { ColorsGenerator } from './ColorsGenerator.stories'
export { CustomContent } from './CustomContent.stories'
