import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps, PropsWithChildren } from 'react'
import { Breadcrumbs } from '..'

// Mock Next.js Link component for demonstration
// In real usage, replace with: import Link from 'next/link'
const NextLink = ({ href, children, ...props }: PropsWithChildren<{ href: string }>) => (
  <a href={href} data-next-link="true" {...props}>
    {children}
  </a>
)

// Mock React Router Link component
// In real usage, replace with: import { Link } from 'react-router-dom'
const RouterLink = ({ to, children }: PropsWithChildren<{ to: string }>) => (
  <a href={to} data-router-link="true">
    {children}
  </a>
)

export const RenderProp: StoryFn<ComponentProps<typeof Breadcrumbs>> = () => (
  <Breadcrumbs>
    <Breadcrumbs.Item to="/home">Home</Breadcrumbs.Item>
    <Breadcrumbs.Item to="/products">Products</Breadcrumbs.Item>
    <Breadcrumbs.Item render={<NextLink href="/products/123" />}>NextLink: /products/123</Breadcrumbs.Item>
    <Breadcrumbs.Item
      render={props => (
        <RouterLink {...props} to="/products/123">
          {props.children}
          <span style={{ marginLeft: '4px' }}>🔗</span>
        </RouterLink>
      )}
    >
      RouterLink: /products/123
    </Breadcrumbs.Item>

    <Breadcrumbs.Item>Details</Breadcrumbs.Item>
  </Breadcrumbs>
)

RenderProp.parameters = {
  docs: {
    description: {
      story:
        'Using the **element form** of the render prop. Props like `href`, `className`, and event handlers are automatically merged with your custom component.',
    },
  },
}
