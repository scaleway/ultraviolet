import type { StoryFn } from '@storybook/react-vite'
import { CheckIcon } from '@ultraviolet/icons/CheckIcon'
import { Bullet } from '..'

export const Icon: StoryFn = props => (
  <>
    <Bullet {...props}>
      <CheckIcon />
    </Bullet>
    <Bullet {...props} sentiment="success">
      <CheckIcon />
    </Bullet>
    <Bullet {...props} sentiment="success" size="small">
      <CheckIcon />
    </Bullet>
  </>
)

Icon.parameters = {
  docs: {
    description: {
      story:
        'To add an icon simply pass it as a child of the `Bullet` component. The sentiment of the icon will automatically follow the sentiment of the bullet.',
    },
  },
}

Icon.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
