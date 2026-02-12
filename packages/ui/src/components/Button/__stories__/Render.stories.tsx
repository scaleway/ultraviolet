import type { StoryFn } from '@storybook/react-vite'
import { PencilIcon } from '@ultraviolet/icons/PencilIcon'
import { forwardRef } from 'react'
import { Stack } from '../..'
import { Button } from '..'

const buttonVariants = ['ghost', 'filled', 'outlined'] as const

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

export const Render: StoryFn<typeof Button> = () => (
  <Stack direction="column" gap={2}>
    <Stack direction="column" gap={1}>
      <strong>Element form (props auto-merged):</strong>
      <Stack alignItems="center" direction="row" gap={2}>
        {buttonVariants.map(variant => (
          <Button
            key={variant}
            render={<MockNextLink href="/about" />}
            variant={variant}
          >
            <PencilIcon />
            {variant}
          </Button>
        ))}
      </Stack>
    </Stack>

    <Stack direction="column" gap={1}>
      <strong>Function form (you control prop merging):</strong>
      <Stack alignItems="center" direction="row" gap={2}>
        <Button
          render={props => <MockNextLink {...props} href="/about" />}
          variant="filled"
        >
          <PencilIcon />
          Click me
        </Button>
      </Stack>
    </Stack>
  </Stack>
)

Render.parameters = {
  docs: {
    description: {
      story: `Use the \`render\` prop to render a custom element (like Next.js Link) while preserving Ultraviolet's Button styling.

## Element form (props auto-merged)

\`\`\`tsx
import NextLink from 'next/link'

<Button render={<NextLink href="/about" />} variant="filled">
  About
</Button>
\`\`\`

Props like \`className\`, \`style\`, \`ref\`, and event handlers are automatically merged.

## Function form (you control prop merging)

\`\`\`tsx
<Button
  render={(props) => <NextLink {...props} href="/about" />}
  variant="filled"
>
  About
</Button>
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

**Note:** \`render\` and \`href\` are mutually exclusive. Use \`render\` when you need to render a custom component. Use \`href\` for simple anchor rendering without a custom component.
`,
    },
  },
}
