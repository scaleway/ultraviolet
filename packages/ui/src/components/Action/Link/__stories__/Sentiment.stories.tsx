import type { ComponentProps } from 'react'
import { Link } from '..'
import { Stack } from '../../../Layout/Stack'
import { SENTIMENTS } from '../constants'

export const Sentiment = (props: ComponentProps<typeof Link>) => (
  <Stack direction={'row'} gap={2}>
    {SENTIMENTS.map(sentiment => (
      <Link key={sentiment} {...props} sentiment={sentiment}>
        {sentiment}
      </Link>
    ))}
  </Stack>
)

Sentiment.parameters = {
  docs: {
    description: {
      story:
        'By default the sentiment of a link is `info` for a link with `target="_blank"`, and `primary` otherwise. You can choose another sentiment using the `sentiment` property.',
    },
  },
}
