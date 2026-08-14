import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Link } from '..'
import { Stack } from '../../Stack'

export const Sentiment = (props: ComponentProps<typeof Link>) => (
  <>
    <Link {...props}>Link to an internal page</Link>
    <Link {...props} target="_blank">
      Link that opens in a new tab
    </Link>
    <Link {...props} target="_blank" sentiment="primary">
      Link to an internal page that opens in new tab
    </Link>
  </>
)

Sentiment.decorators = [
  StoryComponent => (
    <Stack>
      <StoryComponent />
    </Stack>
  ),
] as Decorator[]

Sentiment.parameters = {
  docs: {
    description: {
      story:
        'By default the sentiment of a link is `info` for a link with `target="_blank"`, and `primary` otherwise. For particular cases where you want to modify the sentiment (i.e. a link with `target="_blank"` but to an internal page so it should be primary), you can choose it with the `sentiment` property.',
    },
  },
}
