import { Tag } from '..'
import { SENTIMENTS } from '../../../theme'

import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Sentiments = (props: ComponentProps<typeof Tag>) =>
  SENTIMENTS.map(sentiment => (
    <Tag
      copiable={props.copiable}
      copiedText={props.copiedText}
      copyButton
      copyText={props.copyText}
      disabled={props.disabled}
      isLoading={props.isLoading}
      key={sentiment}
      sentiment={sentiment}
      variant={props.variant}
    >
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
