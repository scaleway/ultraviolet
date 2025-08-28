import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Stack } from '../../Stack'
import { Alert } from '..'
import { ALERT_SENTIMENTS } from '../type'

export const Sentiments = (props: ComponentProps<typeof Alert>) =>
  ALERT_SENTIMENTS.map(sentiment => (
    <Alert
      key={sentiment}
      {...props}
      buttonText="More info"
      onClickButton={() => alert('Button clicked')}
      sentiment={sentiment}
      title={`${sentiment.charAt(0).toUpperCase() + sentiment.slice(1)} title`}
    >
      This is an Alert with the {sentiment} sentiment.
    </Alert>
  ))

Sentiments.decorators = [
  StoryComponent => (
    <Stack gap={2}>
      <StoryComponent />
    </Stack>
  ),
] as Decorator[]

Sentiments.parameters = {
  docs: {
    description: {
      story:
        'Using `sentiment` prop you can change the sentiment of the component. Each sentiment has a default icon set.',
    },
  },
}
