import { TreeMapChart } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: TreeMapChart,
  title: 'UI/Data Display/Chart/TreeMapChart',
  parameters: {
    a11y: false,
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
    experimental: true,
  },
  tags: ['experimental'],
} as Meta<typeof TreeMapChart>

export { Playground } from './Playground.stories'
export { CustomTooltip } from './CustomTooltip.stories'
export { ColorsGenerator } from './ColorsGenerator.stories'
export { CustomContent } from './CustomContent.stories'
