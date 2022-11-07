import { ComponentStory } from '@storybook/react'
import Separator from '..'

export const Icon: ComponentStory<typeof Separator> = ({ icon }) => (
  <>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div>horizontal start</div>
      <Separator icon={icon} />
      <div>horizontal end</div>
    </div>
    <div style={{ alignItems: 'center', display: 'flex', gap: 2 }}>
      <div>vertical start</div>
      <Separator direction="vertical" icon={icon} />
      <div>vertical end</div>
    </div>
  </>
)

Icon.args = {
  icon: 'ray-top-arrow',
}

Icon.decorators = [
  Story => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Story />
    </div>
  ),
] as ComponentStory<typeof Separator>['decorators']
