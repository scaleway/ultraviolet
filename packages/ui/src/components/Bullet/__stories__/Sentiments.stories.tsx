import type { StoryFn } from '@storybook/react-vite'
import { SENTIMENTS } from '../../../theme'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Bullet } from '..'

export const Sentiments: StoryFn = props => (
  <Stack gap={1}>
    <Stack alignItems="center" direction="row" gap={1}>
      <Text as="span" variant="bodyStrong">
        Prominence default:
      </Text>
      {SENTIMENTS.map(sentiment => (
        <Bullet key={sentiment} {...props} sentiment={sentiment}>
          1
        </Bullet>
      ))}
    </Stack>
    <Stack alignItems="center" direction="row" gap={1}>
      <Text as="span" variant="bodyStrong">
        Prominence strong:
      </Text>
      {SENTIMENTS.map(sentiment => (
        <Bullet
          key={sentiment}
          {...props}
          prominence="strong"
          sentiment={sentiment}
        >
          1
        </Bullet>
      ))}
    </Stack>
  </Stack>
)

Sentiments.parameters = {
  docs: {
    description: {
      story:
        'Sentiment defines different colors of your component. You can define it using `Sentiment` property.',
    },
  },
}

Sentiments.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
