import type { DecoratorFunction } from '@storybook/addons'
import type { ComponentProps } from 'react'
import Breadcrumbs, { breadcrumbsVariants } from '..'
import Stack from '../../Stack'

export const Variants = (props: ComponentProps<typeof Breadcrumbs>) =>
  breadcrumbsVariants.map(variant => (
    <Breadcrumbs {...props} key={variant} selected={1} variant={variant}>
      <Breadcrumbs.Item>Step 1</Breadcrumbs.Item>
      <Breadcrumbs.Item>Step 2</Breadcrumbs.Item>
      <Breadcrumbs.Item>Step 3</Breadcrumbs.Item>
    </Breadcrumbs>
  ))

Variants.decorators = [
  StoryComponent => (
    <Stack gap={2}>
      <StoryComponent />
    </Stack>
  ),
] as DecoratorFunction<JSX.Element>[]

Variants.parameters = {
  docs: {
    storyDescription: 'Set `variant` using variant property.',
  },
}
