import type { ComponentStory } from '@storybook/react'
import { Link } from '../index'

export const OneLine: ComponentStory<typeof Link> = () => (
  <>
    <strong>Without ellipsis</strong>
    <div style={{ marginBottom: 16, marginTop: 8, width: 200 }}>
      <Link href="https://scaleway.com">
        This link is quite long and is displayed on two lines.
      </Link>
    </div>
    <strong>With ellipsis (a tooltip is displayed on hover)</strong>
    <div style={{ marginBottom: 16, marginTop: 8, width: 200 }}>
      <Link href="https://scaleway.com" oneLine>
        This link is quite long and is cut in order to avoid two lines.
      </Link>
    </div>
  </>
)

OneLine.parameters = {
  docs: {
    description: {
      story:
        ' `oneLine` prop will force link to be display on a single line by adding `...` after cropped text and will display a tooltip with full text when hovered.',
    },
  },
}
