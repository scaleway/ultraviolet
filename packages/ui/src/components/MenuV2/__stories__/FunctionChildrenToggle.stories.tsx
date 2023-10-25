import type { StoryFn } from '@storybook/react'
import { MenuV2 } from '..'
import { Button } from '../../Button'

export const FunctionChildrenToggle: StoryFn<typeof MenuV2> = () => (
  <MenuV2 disclosure={<Button>MenuV2 </Button>}>
    {({ toggle }) => <MenuV2.Item onClick={toggle}>MenuV2 1</MenuV2.Item>}
  </MenuV2>
)

FunctionChildrenToggle.parameters = {
  docs: {
    description: {
      story: 'You can specify a use a children function to get toggle props',
    },
  },
}

FunctionChildrenToggle.decorators = [
  StoryComponent => (
    <div style={{ height: '300px', width: 'min-content' }}>
      <StoryComponent />
    </div>
  ),
]
