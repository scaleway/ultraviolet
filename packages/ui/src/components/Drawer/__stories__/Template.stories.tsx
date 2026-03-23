import { Drawer } from '..'
import { Button } from '../../Button'

import type { StoryFn } from '@storybook/react-vite'

export const DefaultDisclosure = <Button>Open Drawer</Button>

export const Template: StoryFn<typeof Drawer> = args => <Drawer {...args} />

Template.args = {
  header: 'Drawer',
}
