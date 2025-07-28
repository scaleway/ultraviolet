import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Link } from '..'

export const Examples = (props: ComponentProps<typeof Link>) => (
  <>
    <Text as="p" variant="body">
      To know more about that feature please visit{' '}
      <Link
        {...props}
        target="_blank"
        variant="inline"
        href="https://example.com"
      >
        our website
      </Link>{' '}
      that is available any time.
    </Text>
    <Text as="p" variant="body">
      To know more about that feature please visit{' '}
      <Link {...props} target="_blank" href="https://example.com">
        our website
      </Link>{' '}
      that is available any time.
    </Text>
    <Text as="p" variant="body">
      To know more about that feature please visit{' '}
      <Link {...props} iconPosition="right" href="https://example.com">
        our website
      </Link>{' '}
      that is available any time.
    </Text>
  </>
)

Examples.decorators = [
  StoryComponent => (
    <Stack>
      <StoryComponent />
    </Stack>
  ),
] satisfies Decorator[]
