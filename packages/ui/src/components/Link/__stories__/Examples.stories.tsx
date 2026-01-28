import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Link } from '..'

export const Examples = (args: ComponentProps<typeof Link>) => {
  const { render, ...props } = args

  return (
    <>
      <Text as="p" variant="body">
        To know more about that feature please visit{' '}
        <Link
          {...props}
          href="https://example.com"
          target="_blank"
          variant="inline"
        >
          our website
        </Link>{' '}
        that is available any time.
      </Text>
      <Text as="p" variant="body">
        To know more about that feature please visit{' '}
        <Link {...props} href="https://example.com" target="_blank">
          our website
        </Link>{' '}
        that is available any time.
      </Text>
      <Text as="p" variant="body">
        To know more about that feature please visit{' '}
        <Link {...props} href="https://example.com" iconPosition="right">
          our website
        </Link>{' '}
        that is available any time.
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
