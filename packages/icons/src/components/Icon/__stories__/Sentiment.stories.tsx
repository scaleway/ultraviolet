import type { Decorator } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { EyeIcon } from '../__generated__'

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
