import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Breadcrumbs } from '..'

export const Template: StoryFn<ComponentProps<typeof Breadcrumbs>> = props => (
  <Breadcrumbs {...props}>
    <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
    <Breadcrumbs.Item to="/step1/step2">Step 2</Breadcrumbs.Item>
    <Breadcrumbs.Item to="/step1/step2/step3">Step 3</Breadcrumbs.Item>
    <Breadcrumbs.Item>Step 4</Breadcrumbs.Item>
  </Breadcrumbs>
)
