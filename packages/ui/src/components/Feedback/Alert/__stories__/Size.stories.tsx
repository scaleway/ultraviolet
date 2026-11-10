import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Alert } from '..'
import { Button } from '../../../Action/Button'
import { Stack } from '../../../Layout/Stack'

export const Size = (props: ComponentProps<typeof Alert>) => (
  <>
    <Alert {...props} title="title">
      This is an Alert.
    </Alert>

    <Alert {...props} size="small" title="title">
      This is a small alert
    </Alert>
    <Alert {...props} size="small" title="title">
      {({ buttonProps }) => (
        <Stack alignItems="start" gap={2}>
          Small alert with long children. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
          <Button {...buttonProps} onClick={() => alert('Button clicked')}>
            More info
          </Button>
        </Stack>
      )}
    </Alert>
  </>
)

Size.decorators = [
  StoryComponent => (
    <Stack gap={2}>
      <StoryComponent />
    </Stack>
  ),
] as Decorator[]

Size.parameters = {
  docs: {
    description: {
      story:
        'Using `sentiment` prop you can change the sentiment of the component. Each sentiment has a default icon set.',
    },
  },
}
