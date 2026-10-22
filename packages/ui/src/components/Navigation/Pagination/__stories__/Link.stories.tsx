import type { StoryFn } from '@storybook/react-vite'
import { forwardRef } from 'react'
import type { AnchorHTMLAttributes } from 'react'
import { Pagination } from '..'

// Mock component simulating Next.js Link (must spread props and forward ref)
const MockNextLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ children, ...props }, ref) => (
    <a ref={ref} {...props}>
      {children}
    </a>
  ),
)
MockNextLink.displayName = 'MockNextLink'

export const Link: StoryFn<typeof Pagination> = () => (
  <Pagination
    hrefBuilder={pageNumber => `/tutorials/${pageNumber}`}
    page={2}
    pageCount={10}
    renderLink={(_pageNumber, props) => <MockNextLink {...props} />}
  />
)

Link.parameters = {
  docs: {
    description: {
      story: `Use the \`renderLink\` prop to render a custom element (like a routing component) instead of the default anchor, while preserving Pagination's styling. It receives the target page and the props to spread on the link, including the \`href\` built by \`hrefBuilder\`.

\`\`\`tsx
import NextLink from 'next/link'

<Pagination
  hrefBuilder={pageNumber => \`/tutorials/\${pageNumber}\`}
  page={2}
  pageCount={10}
  renderLink={(pageNumber, props) => <NextLink {...props} />}
/>
\`\`\`

The rendered element must forward the \`ref\` and spread the props it receives.
Use the \`hrefBuilder\` prop to render pagination items as real links instead of buttons, which enables real page navigation (prefetching, open in a new tab, SEO)
`,
    },
  },
}
