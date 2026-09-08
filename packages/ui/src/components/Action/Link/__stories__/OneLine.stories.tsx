import type { StoryFn } from '@storybook/react-vite'
import { Link } from '../index'
import { containerStoryLink } from './styles.css'

export const OneLine: StoryFn<typeof Link> = args => {
  const { render, ...props } = args

  return (
    <>
      <strong>Without ellipsis</strong>
      <div className={containerStoryLink}>
        <Link {...props} href="https://scaleway.com">
          This link is quite long and is displayed on two lines.
        </Link>
      </div>
      <strong>With ellipsis (a tooltip is displayed on hover)</strong>
      <div className={containerStoryLink}>
        <Link {...props} href="https://scaleway.com" oneLine>
          This link is quite long and is cut in order to avoid two lines.
        </Link>
      </div>
    </>
  )
}

OneLine.parameters = {
  docs: {
    description: {
      story:
        ' `oneLine` prop will force link to be display on a single line by adding `...` after cropped text and will display a tooltip with full text when hovered.',
    },
  },
}
