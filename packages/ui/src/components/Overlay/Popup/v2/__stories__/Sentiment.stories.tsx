import type { StoryFn } from '@storybook/react-vite'
import { theme } from '@ultraviolet/themes'
import { Button } from '../../../../Action/Button'
import { Stack } from '../../../../Layout/Stack'
import { Text } from '../../../../Typography/Text'
import { Popup } from '../index'

const SENTIMENTS = ['neutral', 'primary'] as const

export const Sentiment: StoryFn<typeof Popup> = () => (
  <Stack direction="row" gap={2}>
    {SENTIMENTS.map(sentiment => (
      <Popup.Root key={sentiment}>
        <Popup.Trigger>
          <Button sentiment={sentiment} variant="filled">
            {sentiment}
          </Button>
        </Popup.Trigger>
        <Popup.Panel placement="top" sentiment={sentiment} arrow>
          <Stack gap={1} style={{ padding: theme.space['1.5'] }}>
            <Text as="h3" variant="bodyStrong">
              {sentiment} panel
            </Text>
            <Text as="p" variant="bodySmall">
              Popup using the {sentiment} sentiment.
            </Text>
          </Stack>
        </Popup.Panel>
      </Popup.Root>
    ))}
  </Stack>
)

Sentiment.decorators = [
  StoryComponent => (
    <Stack alignItems="center" gap={2} justifyContent="center" style={{ margin: '4rem 1rem' }}>
      <StoryComponent />
    </Stack>
  ),
]
