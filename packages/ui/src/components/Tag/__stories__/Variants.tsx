import type { DecoratorFunction } from '@storybook/addons'
import type { ComponentProps } from 'react'
import { Tag } from '..'
import { SENTIMENTS } from '../../../theme'

export const Variants = (props: ComponentProps<typeof Tag>) =>
  SENTIMENTS.map(sentiment => (
    <Tag {...props} key={sentiment} variant={sentiment}>
      {sentiment}
    </Tag>
  ))

Variants.parameters = {
  docs: {
    description: {
      story:
        'Variants defines different colors of you component. You can define it using `variant` property.',
    },
  },
}

Variants.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
] as DecoratorFunction<JSX.Element>[]
