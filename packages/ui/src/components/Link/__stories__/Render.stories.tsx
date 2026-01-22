import type { Decorator, StoryFn } from '@storybook/react-vite'
import { forwardRef } from 'react'
import { Stack } from '../../Stack'
import { Link } from '..'

// Mock component simulating Next.js Link (must spread props and forward ref)
const MockNextLink = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
>(({ href, children, ...props }, ref) => (
  <a href={href} ref={ref} {...props}>
    {children}
  </a>
))
MockNextLink.displayName = 'MockNextLink'

export const Render: StoryFn<typeof Link> = () => (
  <Stack direction="column" gap={2}>
    <Stack direction="column" gap={1}>
      <strong>Element form (props auto-merged):</strong>
      <Link render={<MockNextLink href="/about" />} sentiment="primary">
        Primary Link
      </Link>
      <Link render={<MockNextLink href="/about" />} sentiment="info">
        Info Link
      </Link>
      <Link
        render={<MockNextLink href="/about" />}
        sentiment="primary"
        size="small"
      >
        Small Link
      </Link>
    </Stack>

    <Stack direction="column" gap={1}>
      <strong>Function form (you control prop merging):</strong>
      <Link
        render={props => <MockNextLink {...props} href="/about" />}
        sentiment="primary"
      >
        Primary Link (function)
      </Link>
    </Stack>
  </Stack>
)

Render.decorators = [
  StoryComponent => (
    <Stack>
      <StoryComponent />
    </Stack>
  ),
] as Decorator[]

Render.parameters = {
  docs: {
    description: {
      story: `Use the \`render\` prop to render a custom element (like Next.js Link) while preserving Ultraviolet's Link styling.

## Element form (props auto-merged)

\`\`\`tsx
import NextLink from 'next/link'

<Link render={<NextLink href="/about" />} sentiment="primary">
  About
</Link>
\`\`\`

Props like \`className\`, \`style\`, \`ref\`, and event handlers are automatically merged.

## Function form (you control prop merging)

\`\`\`tsx
<Link
  render={(props) => <NextLink {...props} href="/about" />}
  sentiment="primary"
>
  About
</Link>
\`\`\`

The function receives computed props including \`className\`, \`style\`, \`ref\`, and \`children\`. You must spread them onto your element.

## Important: Custom components must be "open for extension"

Your custom component must:
- Forward the \`ref\` prop
- Spread remaining props onto the underlying element

\`\`\`tsx
const CustomLink = forwardRef((props, ref) => (
  <a ref={ref} {...props} />
))
\`\`\`
`,
    },
  },
}
