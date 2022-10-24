import { Meta } from '@storybook/react'
import Table, { Body, BodyCell, Head, HeadCell, Row } from '..'

export default {
  component: Table,
  parameters: {
    docs: {
      description: {
        component: 'TabGroup gives a navigation made out of tabs.',
      },
    },
  },
  subcomponents: { Body, BodyCell, Head, HeadCell, Row },
  title: 'Components/Data Display/Table',
} as Meta

export { Playground } from './Playground.stories'
export { Hoverable } from './Hoverable.stories'
export { Loader } from './Loader.stories'
