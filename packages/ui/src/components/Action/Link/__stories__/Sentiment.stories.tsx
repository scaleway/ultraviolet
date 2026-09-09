import type { ComponentProps } from 'react'
import { Link } from '..'
import { Stack } from '../../../Layout/Stack'
import { SENTIMENTS } from '../constants'

export const Sentiment = (props: ComponentProps<typeof Link>) => (
  <Stack direction={'row'} gap={2}>
    {SENTIMENTS.map(sentiment => (
      <Link key={sentiment} sentiment={sentiment} {...props}>
        {sentiment}
      </Link>
    ))}
  </Stack>
)

Sentiment.parameters = {
  docs: {
    description: {
      story:
        'By default the sentiment of a link is `info` for a link with `target="_blank"`, and `primary` otherwise. For particular cases where you want to modify the sentiment (i.e. a link with `target="_blank"` but to an internal page so it should be primary), you can choose it with the `sentiment` property.',
    },
  },
}
