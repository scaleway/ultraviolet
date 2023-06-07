import type { Decorator } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Link } from '..'
import { SENTIMENTS } from '../../../theme'
import { Stack } from '../../Stack'

export const Sentiments = (props: ComponentProps<typeof Link>) =>
  SENTIMENTS.map(sentiment => (
    <Link {...props} key={sentiment} sentiment={sentiment}>
      {sentiment}
    </Link>
  ))

Sentiments.decorators = [
  StoryComponent => (
    <Stack>
      <StoryComponent />
    </Stack>
  ),
] as Decorator[]
