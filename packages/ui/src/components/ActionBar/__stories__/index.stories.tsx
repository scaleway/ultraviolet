import type { Meta } from '@storybook/react'
import { ActionBar } from '..'

export default {
  component: ActionBar,
  title: 'Components/Overlay/ActionBar',
  parameters: {
    docs: {
      description: {
        component: `The ActionBar is a floating bar that appears at the bottom of a page.
It can be used to display important actions or information to the user, and can be configured to display a variety of different content types.

**Note:** ActionBar is added into a portal at the end of the body element. This means that it will always be on top of other elements without \`z-index\`,
and will not be affected by the layout of the page it is on.`,
      },
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { Ranks } from './Ranks.stories'
