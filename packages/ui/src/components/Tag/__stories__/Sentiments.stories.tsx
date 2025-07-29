import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { SENTIMENTS } from '../../../theme'
import { Tag } from '..'

export const Sentiments = (props: ComponentProps<typeof Tag>) =>
  SENTIMENTS.map(sentiment => (
    <Tag key={sentiment} {...props} sentiment={sentiment}>
      {sentiment}
    </Tag>
  ))

Sentiments.parameters = {
  docs: {
    description: {
      story:
        'Sentiments defines different colors of you component. You can define it using `sentiment` property.',
    },
  },
}

Sentiments.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
] as Decorator[]
