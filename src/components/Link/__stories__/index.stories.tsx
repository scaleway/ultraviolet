import { Meta, Story } from '@storybook/react'
import React from 'react'
import Link, { LinkProps, linkVariants } from '..'
import { Box, Boxer } from '../..'

export default {
  component: Link,
  title: 'Components/Foundation/Link',
} as Meta

const Template: Story<LinkProps> = args => <Link {...args} />

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    storyDescription: 'Creates a styled link.',
  },
}
Default.decorators = [
  () => (
    <Box p={2} backgroundColor="gray200">
      <Boxer my={1}>
        <Link href="localhost:6006">Basic link</Link>
      </Boxer>
    </Box>
  ),
]

export const Variants = Template.bind({})
Variants.parameters = {
  docs: {
    storyDescription:
      'Using `variant` prop you can change the look and feel of the component.',
  },
}
Variants.decorators = [
  () => (
    <Box p={2} backgroundColor="gray200">
      <Boxer my={1}>
        {linkVariants.map(variant => (
          <Link key={variant} href="localhost:6006" variant={variant}>
            {variant}
          </Link>
        ))}
      </Boxer>
    </Box>
  ),
]

export const Target = Template.bind({})
Target.parameters = {
  docs: {
    storyDescription:
      'Using `target` prop you can change specify the target you want for your link.',
  },
}
Target.decorators = [
  () => (
    <Box p={2} backgroundColor="gray200">
      <Boxer my={1}>
        <Link href="localhost:6006" target="_blank">
          Link opens in a new tab
        </Link>
      </Boxer>
    </Box>
  ),
]

export const AbsoluteURLs = Template.bind({})
AbsoluteURLs.parameters = {
  docs: {
    storyDescription:
      'Absolute URLs (starting by `http` or `https`) are automatically detected in `to`. If detected, a `a` tag is used instead of the default `linkComponent` specified in the theme.',
  },
}
AbsoluteURLs.decorators = [
  () => (
    <Box p={2} backgroundColor="gray200">
      <Boxer my={1}>
        <Link href="https://localhost:6006">Absolute URL</Link>
      </Boxer>
    </Box>
  ),
]

export const LinkComponent = Template.bind({})
LinkComponent.parameters = {
  docs: {
    storyDescription:
      'By default link is a `a`. You can specify a custom component (like React Router Link) by changing the theme entry `linkComponent`.',
  },
}
