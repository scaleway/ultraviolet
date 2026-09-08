import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Breadcrumbs } from '..'

export const Template: StoryFn<ComponentProps<typeof Breadcrumbs>> = props => (
  <Breadcrumbs {...props}>
    <Breadcrumbs.Item to="/home">Home</Breadcrumbs.Item>
    <Breadcrumbs.Item to="/products">Products</Breadcrumbs.Item>
    <Breadcrumbs.Item to="/products/1">Instance</Breadcrumbs.Item>
    <Breadcrumbs.Item to="/products/1/details">Overview</Breadcrumbs.Item>
  </Breadcrumbs>
)
