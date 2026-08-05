import type { Decorator } from '@storybook/react-vite'
import { DocPaperIcon } from '@ultraviolet/icons/DocPaperIcon'
import type { ComponentProps } from 'react'
import { Link } from '..'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

export const Examples = (args: ComponentProps<typeof Link>) => {
  const { render, ...props } = args

  return (
    <>
      <Text as="p" variant="body">
        To know more about that feature please visit{' '}
        <Link {...props} href="https://example.com" target="_blank">
          our website
        </Link>
        .
      </Text>
      <Text as="p" variant="body">
        Update the view using the{' '}
        <Link {...props}>
          filters panel <DocPaperIcon />
        </Link>
        .
      </Text>
      <Text as="p" variant="body">
        Go to your <Link {...props}>profile page</Link> to update your preferences.
      </Text>
    </>
  )
}

Examples.decorators = [
  StoryComponent => (
    <Stack>
      <StoryComponent />
    </Stack>
  ),
] satisfies Decorator[]
