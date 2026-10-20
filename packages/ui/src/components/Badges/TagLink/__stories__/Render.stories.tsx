import type { StoryFn } from '@storybook/react-vite'
import { forwardRef } from 'react'
import type { AnchorHTMLAttributes } from 'react'
import { TagLink } from '..'

// Mock component simulating Next.js Link (must spread props and forward ref)
const MockNextLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ children, ...props }, ref) => (
    <a ref={ref} {...props}>
      {children}
    </a>
  ),
)
MockNextLink.displayName = 'MockNextLink'

export const Render: StoryFn<typeof TagLink> = () => (
  <TagLink prefixText="id" link="link" renderLink={<MockNextLink href="/" />} />
)

Render.parameters = {
  docs: {
    description: {
      story: `Use the \`renderLink\` prop to render a custom element (like a routing component) instead of the default anchor, while preserving TagLink's styling.

\`\`\`tsx
import NextLink from 'next/link'

<TagLink prefixText="id" link="link" renderLink={<NextLink href="/" />} />
\`\`\`

The custom element must forward the \`ref\` and spread the props it receives.`,
    },
  },
}
