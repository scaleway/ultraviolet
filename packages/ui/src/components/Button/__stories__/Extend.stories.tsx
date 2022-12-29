import type { ComponentStory } from '@storybook/react'
import { Button } from '..'
import { Stack } from '../../Stack'

const Buttons: ComponentStory<typeof Button> = ({ ...props }) => (
  <>
    <div>
      <Button icon="plus" iconSize={24} extend size="large" {...props}>
        Normal Button
      </Button>
    </div>
    <div>
      <Button icon="plus" iconSize={24} extend size="medium" {...props}>
        Normal Button
      </Button>
    </div>
    <div>
      <Button icon="plus" iconSize={24} extend size="small" {...props}>
        Normal Button
      </Button>
    </div>
    <div>
      <Button icon="plus" iconSize={24} extend size="xsmall" {...props}>
        Normal Button
      </Button>
    </div>
    <div>
      <Button icon="plus" iconSize={24} extend size="xxsmall" {...props}>
        Normal Button
      </Button>
    </div>
    <div>
      <Button
        icon="plus"
        iconSize={24}
        extend
        as="a"
        href="https://scaleway.com"
        {...props}
      >
        Link Button
      </Button>
    </div>
    <div>
      <Button
        icon="plus"
        iconSize={24}
        extend
        as="a"
        href="https://scaleway.com"
        size="small"
        {...props}
      >
        Link Button
      </Button>
    </div>
  </>
)

export const Extend: ComponentStory<typeof Button> = ({ ...props }) => (
  <Stack gap={1} style={{ width: '100%' }}>
    <Stack gap={1}>
      <Buttons {...props} />
    </Stack>
    <Stack gap={1} alignItems="center">
      <Buttons {...props} />
    </Stack>
    <Stack gap={1} alignItems="end">
      <Buttons {...props} />
    </Stack>
  </Stack>
)

Extend.parameters = {
  docs: {
    storyDescription:
      'This shows how to make button extensible using `extend` on Button. ⚠️ It requires an `icon`.',
  },
}
