---
"@ultraviolet/ui": minor
---

- Added `render` prop to Link and Button components for composition with custom elements
  - Enables integration with routing libraries like Next.js Link without losing Ultraviolet styling
  - Element form: `<Link render={<NextLink href="/about" />}>About</Link>`
  - Function form: `<Link render={(props) => <NextLink {...props} href="/about" />}>About</Link>`
  - Replaces the need for deprecated `legacyBehavior` prop in Next.js Link components
- Added `polymorphic` utility for render prop handling and props merging
