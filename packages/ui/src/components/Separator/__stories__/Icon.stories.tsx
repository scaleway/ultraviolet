import type { StoryFn } from '@storybook/react'
import { RayTopArrowIcon } from '@ultraviolet/icons'
import { Separator } from '..'

export const Icon: StoryFn<typeof Separator> = () => (
  <>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div>horizontal start</div>
      <Separator>
        <RayTopArrowIcon size="medium" />
      </Separator>
      <div>horizontal end</div>
    </div>
    <div style={{ alignItems: 'center', display: 'flex', gap: 2 }}>
      <div>vertical start</div>
      <Separator direction="vertical">
        <RayTopArrowIcon size="medium" />
      </Separator>
      <div>vertical end</div>
    </div>
  </>
)

Icon.decorators = [
  Story => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Story />
    </div>
  ),
] as StoryFn<typeof Separator>['decorators']
