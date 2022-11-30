import { ComponentStory } from '@storybook/react'
import Button from '..'

export const IconSize: ComponentStory<typeof Button> = ({ ...props }) => (
  <>
    <Button icon="lock" iconSize={10} {...props}>
      Icon 10
    </Button>
    <Button icon="lock" iconSize={18} {...props}>
      Icon 18
    </Button>
    <Button icon="lock" iconSize={24} {...props}>
      Icon 24
    </Button>
    <Button icon="lock" iconSize={32} {...props}>
      Icon 32
    </Button>
  </>
)

IconSize.parameters = {
  docs: {
    storyDescription:
      'This shows how to use `iconSize` on Button. ⚠️ It requires an `icon`.',
  },
}
