import { Menu } from '..'
import { CopyButton } from '../../CopyButton'
import { Template } from './Template.stories'

export const RightComponent = Template.bind({})

RightComponent.args = {
  children: [
    <Menu.Item
      borderless
      key="borderless"
      rightComponent={
        <CopyButton sentiment="neutral" size="xsmall" value="Power on" />
      }
    >
      Power on
    </Menu.Item>,
    <Menu.Item borderless key="power on">
      Power on
    </Menu.Item>,
  ],
  hideOnClickItem: true,
}

RightComponent.decorators = [
  StoryComponent => (
    <div style={{ height: '80px', width: 'min-content' }}>
      <StoryComponent />
    </div>
  ),
]
