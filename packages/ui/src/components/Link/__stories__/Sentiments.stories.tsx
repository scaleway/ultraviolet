import type { Decorator } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Link } from '..'
import { SENTIMENTS } from '../../../theme'
import { Stack } from '../../Stack'

export const Sentiments = (props: ComponentProps<typeof Link>) => (
  <Stack direction="column">
    {SENTIMENTS.map(sentiment => (
      <Link {...props} key={sentiment} sentiment={sentiment}>
        {sentiment}
      </Link>
    ))}
    <div style={{ background: 'white' }}>
      <Link {...props} sentiment="black">
        Use sentiment black for the link to be black no matter the theme
      </Link>
    </div>
    <div style={{ background: 'black' }}>
      <Link {...props} sentiment="white">
        Use sentiment white for the link to be white no matter the theme
      </Link>
    </div>
  </Stack>
)

Sentiments.decorators = [
  StoryComponent => (
    <Stack>
      <StoryComponent />
    </Stack>
  ),
] as Decorator[]
