import { ComponentMeta } from '@storybook/react'
import PieChart from '..'

export default {
  component: PieChart,
  decorators: [
    StoryComponent => (
      <div style={{ marginBottom: '1em', marginLeft: '2em' }}>
        <StoryComponent />
      </div>
    ),
  ],
  title: 'Components/Data Display/Chart/PieChart',
} as ComponentMeta<typeof PieChart>

export { Playground } from './Playground.stories'
export { Content } from './Content.stories'
export { Legends } from './Legends.stories'
export { PopperDetails } from './PopperDetails.stories'
export { EmptyLegend } from './EmptyLegend.stories'
export { Strikethrough } from './Strikethrough.stories'
