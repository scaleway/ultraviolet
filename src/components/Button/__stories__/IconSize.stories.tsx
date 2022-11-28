import { ComponentStory } from '@storybook/react'
import Button from '..'

export const IconSize: ComponentStory<typeof Button> = () => (
  <>
    <Button icon="lock" iconSize={10}>
      Icon 10
    </Button>
    <Button icon="lock" iconSize={18}>
      Icon 18
    </Button>
    <Button icon="lock" iconSize={24}>
      Icon 24
    </Button>
    <Button icon="lock" iconSize={32}>
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
