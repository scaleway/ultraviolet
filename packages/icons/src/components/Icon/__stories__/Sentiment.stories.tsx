import { Stack } from '@ultraviolet/ui'

import { EyeIcon } from '../__generated__'

import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

const COLORS = ['primary', 'success', 'warning'] as const

export const Sentiment = (args: ComponentProps<typeof EyeIcon>) =>
  COLORS.map(sentiment => (
    <EyeIcon key={sentiment} sentiment={sentiment} {...args} />
  ))

Sentiment.parameters = {
  docs: {
    description: { story: 'Set sentiment using `sentiment` property.' },
  },
}

Sentiment.decorators = [
  Story => (
    <Stack alignItems="center" direction="row" gap={2}>
      <Story />
    </Stack>
  ),
] as Decorator[]
