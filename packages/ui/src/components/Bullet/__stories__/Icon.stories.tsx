import type { StoryFn } from '@storybook/react-vite'
import { CheckIcon } from '@ultraviolet/icons/CheckIcon'
import { Bullet } from '..'
import { VisuallyHidden } from '../../VisuallyHidden'

export const Icon: StoryFn = props => (
  <>
    <Bullet {...props}>
      <VisuallyHidden>Done</VisuallyHidden>
      <CheckIcon />
    </Bullet>
    <Bullet {...props} sentiment="success">
      <VisuallyHidden>Done</VisuallyHidden>
      <CheckIcon />
    </Bullet>
    <Bullet {...props} sentiment="success" size="small">
      <VisuallyHidden>Done</VisuallyHidden>
      <CheckIcon />
    </Bullet>
  </>
)

Icon.parameters = {
  docs: {
    description: {
      story:
        'To add an icon simply pass it as a child of the `Bullet` component. The sentiment of the icon will automatically follow the sentiment of the bullet. **Do not forget to label the icon (use `VisuallyHidden` component, `accessibleLabel` prop on the icon, or with a tooltip)**',
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
